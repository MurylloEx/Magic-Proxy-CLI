import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'magic-proxy',
  templateUrl: './magic-proxy.component.html',
  styleUrls: ['./magic-proxy.component.css']
})
export class MagicProxyComponent implements OnInit {

  static s_DefaultProxyFields = {
    domain: '',
    round: 0,
    timeout: 10000,
    isDefault: false,
    destinations: [],
    websockDestinations: []
  };

  m_Proxies: any[] = [];
  m_NewProxy: any = {...MagicProxyComponent.s_DefaultProxyFields};

  constructor(
    private api: ApiService, 
    private notification: NotificationService) { }

  async ngOnInit(): Promise<void> {
    let result = await this.api.getProxies();
    if (!result.error){
      this.m_Proxies = result.data.map(({ destinations, websockDestinations, ...rest }) => {
        return {
          ...rest,
          destinations: destinations.split('//:!//'),
          websockDestinations: websockDestinations.split('//:!//')
        }
      });
      this.notification.info()
        .title('Showing the proxy settings.')
        .body('All running proxies retrieved from database.')
        .closable().go();
    } else {
      this.notification.error()
        .title('Failed to list proxy settings.')
        .body('Cannot retrieve from database your proxies. Check your internet connection and try again.')
        .closable().go();
    }
  }

  onProxyCreated(proxy){
    this.m_NewProxy = {...MagicProxyComponent.s_DefaultProxyFields};
    this.m_Proxies.push(proxy);
  }

  onProxyDeleted(proxy){
    this.m_Proxies = this.m_Proxies.filter(v => (v.id != proxy.id));
  }

  onProxyUpdated(proxy){
    this.m_Proxies = this.m_Proxies.filter(v => {
      if (v.id != proxy.id)
        return v;
      return proxy;
    });
  }

}
