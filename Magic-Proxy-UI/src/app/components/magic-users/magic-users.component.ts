import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'magic-users',
  templateUrl: './magic-users.component.html',
  styleUrls: ['./magic-users.component.css']
})
export class MagicUsersComponent implements OnInit {

  m_Users: any[] = [];
  m_SelectedUser: any;
 
  constructor(
    private api: ApiService, 
    private notification: NotificationService) { }

  async ngOnInit(): Promise<void> {
    let result = await this.api.getUser();
    if (!result.error){
      this.m_Users = result.data;
      this.notification.info()
        .title('Showing the users settings.')
        .body('All users retrieved from database.')
        .closable().go();
    } else {
      this.notification.error()
        .title('Failed while retrieving users.')
        .body('Cannot retrieve users from server. Check your connection.')
        .closable().go();
    }
  }

  onUserDeleted(user){
    this.m_Users = this.m_Users.filter(v => 
      (v.id != user.id) && (v.name != user.name));
  }

  onUserCreated(user){
    console.log(user)
    this.m_Users.push(user);
  }

  onUserUpdated(user){
    this.m_Users = this.m_Users.map(v => {
      if (v.id != user.id)
        return v;
      return user;
    });
  }

}
