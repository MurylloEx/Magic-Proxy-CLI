import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'magic-user-entry',
  templateUrl: './magic-user-entry.component.html',
  styleUrls: ['./magic-user-entry.component.css']
})
export class MagicUserEntryComponent implements OnInit {

  @Input() mgUser: any = {};
  @Input() mgIsCreating: boolean = true;
  @Output() mgUserDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() mgUserCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() mgUserUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService,
    private notification: NotificationService) { }
  
  ngOnInit(): void {}

  async onSave(event){
    this.mgUser.role = Number(this.mgUser.role);
    if (this.mgIsCreating){
      let result = await this.api.createUser(this.mgUser);
      if (!result.error){
        this.mgUserCreated.emit(this.mgUser);
        this.mgUser = {};
        this.notification.success()
          .title('Created user with success!')
          .body(`Successfully created user with name #${result.data?.name}.`)
          .closable().go();
      } else {
        this.notification.error()
          .title('Failed while creating user.')
          .body(`Cannot create the user with name #${result.data?.name}.`)
          .closable().go();
      }
    } else {
      let result = await this.api.updateUser(this.mgUser.id, this.mgUser);
      let userName = this.mgUser?.name;
      if (!result.error){
        this.mgUserUpdated.emit(this.mgUser);
        this.notification.success()
          .title('Updated user with success!')
          .body(`Successfully updated user with name #${userName}.`)
          .closable().go();
      } else {
        this.notification.error()
          .title('Failed while updating user.')
          .body(`Cannot updated the user with name #${userName}.`)
          .closable().go();
      }
    }
  }

  async onRemove(event): Promise<void> {
    let result = await this.api.deleteUser(this.mgUser?.id);
    let userId = this.mgUser?.id;
    if (!result.error){
      this.mgUserDeleted.emit(this.mgUser);
      this.notification.success()
        .title('Deleted with success!')
        .body(`Deleted user with id #${userId}.`)
        .closable().go();
    } else {
      this.notification.error()
        .title('Failed while deleting user.')
        .body(`Cannot delete the user with id #${userId}.`)
        .closable().go();
    }
  }

}
