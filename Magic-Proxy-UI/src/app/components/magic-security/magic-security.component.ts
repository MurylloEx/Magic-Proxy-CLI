import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'magic-security',
  templateUrl: './magic-security.component.html',
  styleUrls: ['./magic-security.component.css']
})
export class MagicSecurityComponent implements OnInit {

  m_TlsData = {
    Certificate: '',
    PrivateKey: ''
  }

  constructor(
    private api: ApiService, 
    private notification: NotificationService) { }

  async ngOnInit(): Promise<void> {
    let result = await this.api.getTls();
    if (!result.error){
      const [tlsData] = <any[]>Array.from(result.data).reverse();
      if (!!tlsData){
        this.m_TlsData = {
          Certificate: tlsData.certificate,
          PrivateKey: tlsData.privateKey
        }
        this.notification.info()
          .title('Showing the last TLS settings.')
          .body('Your certificate was retrieved from database.')
          .closable().go();
      }
    } else {
      this.notification.error()
        .title('Cannot retrieve TLS certificate!')
        .body('An error has found while retrieving certificate from database.')
        .closable().go();
    }
  }

  async onApplyChanges(event: any){
    let result = await this.api.createTls({
      certificate: this.m_TlsData.Certificate,
      privateKey: this.m_TlsData.PrivateKey
    });
    if (!result.error){
      this.notification.success()
        .title('Security settings updated!')
        .body('Your TLS certificate is now up-to-date.')
        .closable().go();
    } else {
      this.notification.error()
        .title('Cannot send TLS certificate!')
        .body('Check if your certificate has the correct format.')
        .closable().go();
    }
  }

}
