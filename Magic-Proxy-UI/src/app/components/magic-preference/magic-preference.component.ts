import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'magic-preference',
  templateUrl: './magic-preference.component.html',
  styleUrls: ['./magic-preference.component.css']
})
export class MagicPreferenceComponent implements OnInit {

  m_Settings = {
    allowUnknownHost: false,
    allowWebsockets: false,
    httpEnabled: false,
    httpsEnabled: false,
    hstsEnabled: false,
    httpPort: 80,
    httpsPort: 443
  }

  constructor(
    private api: ApiService,
    private notification: NotificationService) { }

  async ngOnInit(): Promise<void> {
    let result = await this.api.getSettings();
    if (!result.error){
      const [settings] = <any[]>Array.from(result.data).reverse();
      this.m_Settings = settings || this.m_Settings;
      this.notification.info()
        .title('Showing last preferences.')
        .body('After apply changes the Magic Proxy will automatically reload.')
        .closable().go();
    } else {
      this.notification.error()
        .title('Error while loading preferences.')
        .body('Cannot retrieve preferences from database. Check your internet connection.')
        .closable().go();
    }
  }

  async onSavePreferences(event){
    this.m_Settings.httpPort = Number(this.m_Settings.httpPort);
    this.m_Settings.httpsPort = Number(this.m_Settings.httpsPort);
    let result = await this.api.createSettings(this.m_Settings);
    if (!result.error){
      this.notification.success()
        .title('Saved with success!')
        .body('Wait while Magic Proxy reload, it will take only 30 seconds and your changes will have effect.')
        .closable().go();
    } else {
      this.notification.error()
        .title('Error while saving preferences!')
        .body('Cannot save preferences. Check if your form is correct and all fields have a value.')
        .closable().go();
    }
  }

}
