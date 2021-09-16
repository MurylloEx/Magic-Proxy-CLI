import { Injectable } from '@nestjs/common';
import { createProxy, ProxyConfig, ProxyTrigger } from 'magic-reverse-proxy';
import { ProxyService } from './proxy.service';
import { SettingsService } from './settings.service';
import { TlsService } from './tls.service';

@Injectable()
export class MagicProxyService {

  private m_IsRunning = false;
  private m_ProxyTrigger: ProxyTrigger;

  constructor(
    private settingsService: SettingsService,
    private tlsService: TlsService,
    private proxyService: ProxyService){}

  public async reloadProxy(){
    if (!this.m_ProxyTrigger)
      return;
    this.unbindProxy();

    let tls = await this.tlsService.findLast();
    let settings = await this.settingsService.findLast();
    let proxies = await this.proxyService.findAll();
    let [defaultProxy] = proxies.filter(v => !!v.isDefault);

    this.m_ProxyTrigger = createProxy({
      enable_hsts: settings.hstsEnabled,
      allow_unknown_host: settings.allowUnknownHost,
      allow_websockets: settings.allowWebsockets,
      http:{
        enabled: settings.httpEnabled,
        port: settings.httpPort
      },
      https:{
        enabled: settings.httpsEnabled,
        port: settings.httpsPort,
        sslkey: tls.privateKey,
        sslcert: tls.certificate
      },
      proxies: proxies.filter(v => !v.isDefault).map(v => {
        return {
          timeout: v.timeout,
          round: v.round,
          destination: v.destinations.split('//:!//'),
          sockDestination: v.websockDestinations.split('//:!//')
        }
      }),
      default_proxy: {
        timeout: defaultProxy.timeout,
        round: defaultProxy.round,
        destination: defaultProxy.destinations.split('//:!//'),
        sockDestination: defaultProxy.websockDestinations.split('//:!//')
      }
    });
    
    this.bindProxy();
  }

  public buildProxy(options: ProxyConfig) {
    this.m_ProxyTrigger = createProxy(options);
  }

  public bindProxy() {
    if (this.m_IsRunning)
      return;
    try{
      this.m_ProxyTrigger.bind();
      this.m_IsRunning = true;
    } catch(e){}
  }

  public unbindProxy() {
    if (!this.m_IsRunning)
      return;
    try{
      this.m_ProxyTrigger.unbind();
      this.m_IsRunning = false;
    } catch(e){}
  }

}
