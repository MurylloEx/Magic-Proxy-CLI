import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { createProxy, ProxyConfig, ProxyTrigger } from 'magic-reverse-proxy';
import { ProxyService } from './proxy.service';
import { SettingsService } from './settings.service';
import { TlsService } from './tls.service';
import { UsersService } from './users.service';
import { v4 as Uuidv4 } from 'uuid';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class MagicProxyService implements OnApplicationBootstrap{

  private m_IsRunning = false;
  private m_ProxyTrigger: ProxyTrigger;

  constructor(
    private settingsService: SettingsService,
    private tlsService: TlsService,
    private proxyService: ProxyService,
    private userService: UsersService){}

  createAdmin(){
    setTimeout(async () => {
      const admin = new UserModel();
      admin.name = 'admin';
      admin.role = 1;
      admin.token = Uuidv4();

      console.log('[Info] This is the first time that you use Magic Proxy.');
      console.log('[Info] A user will be created with a primary token that can be used to access all features.');
      console.log('[Security] Creating the first user of Magic Proxy.');
      console.log('[Security] Generating primary token for user #admin.');
      console.log('[Security] Your security token is ' + admin.token + ' for user #admin.');
      
      await this.userService.insert(admin);
    }, 5000);
  }

  async onApplicationBootstrap() {
    if ((await this.userService.findAll()).length == 0){
      this.createAdmin();
    }
    await this.reloadProxy();
  }

  public async reloadProxy(){
    try{
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
          port: settings.httpPort,
          middlewares: [],
          start_callback: () => {}
        },
        https:{
          enabled: settings.httpsEnabled,
          port: settings.httpsPort,
          middlewares: [],
          sslkey: tls.privateKey,
          sslcert: tls.certificate,
          start_callback: () => {}
        },
        proxies: proxies.filter(v => !v.isDefault).map(v => {
          return {
            domain: v.domain,
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
    } catch (e){
      console.log('[Warning] ' + e.message);
    }
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
