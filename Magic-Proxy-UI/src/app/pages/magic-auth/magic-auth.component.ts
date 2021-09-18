import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-magic-auth',
  templateUrl: './magic-auth.component.html',
  styleUrls: ['./magic-auth.component.css']
})
export class MagicAuthComponent implements OnInit {

  m_AuthData = {
    name: '',
    token: ''
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private session: SessionService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    if (this.session.isAuthenticated()){
      this.router.navigateByUrl('/panel');
    }
  }

  async doLogin(credentials: any){
    let result = await this.api.authLogin(credentials);
    if (!result.error){
      const { token, role } = result.data;
      this.session.authenticate(token, role, result.data);
      this.router.navigateByUrl('/panel');
    } else {
      this.notification.error()
        .title('Check your credentials again!')
        .body('Login attempt failed. Wrong credentials!')
        .closable().go();
    }
  }

}
