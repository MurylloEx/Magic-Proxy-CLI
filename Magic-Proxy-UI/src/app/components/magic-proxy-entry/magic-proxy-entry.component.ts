import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'magic-proxy-entry',
  templateUrl: './magic-proxy-entry.component.html',
  styleUrls: ['./magic-proxy-entry.component.css']
})
export class MagicProxyEntryComponent implements OnInit {

  @Input() mgIsCreating: boolean = false;
  @Input() mgProxy: any = {};
  @Output() mgProxyChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() mgProxyDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() mgProxyCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() mgProxyUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService,
    private notification: NotificationService) { }

  ngOnInit(): void {
  }

  async onApplyChanges(event){
    if(this.mgIsCreating){
      const { destinations, websockDestinations, ...rest } = this.mgProxy;
      const data = { 
        round: 0,
        destinations: destinations.join('//:!//'),
        websockDestinations: websockDestinations.join('//:!//'),
        ...rest,
      };
      let result = await this.api.createProxy(data);
      if (!result.error){
        this.mgProxyCreated.emit(this.mgProxy);
        this.notification.success()
          .title('Added new proxy rule.')
          .body('Successfully added proxy rule.')
          .closable().go();
      } else {
        this.notification.error()
          .title('Error while adding new proxy rule.')
          .body('Cannot add new proxy rule. Check your internet connection.')
          .closable().go();
      }
    } else {
      const { destinations, websockDestinations, ...rest } = this.mgProxy;
      const data = { 
        destinations: destinations.join('//:!//'),
        websockDestinations: websockDestinations.join('//:!//'),
        ...rest,
      };
      let result = await this.api.updateProxy(this.mgProxy?.id, data);
      if (!result.error){
        this.mgProxyCreated.emit(this.mgProxy);
        this.notification.success()
          .title('Updated proxy rule.')
          .body('Successfully updated proxy rule.')
          .closable().go();
      } else {
        this.notification.error()
          .title('Error while updating proxy rule.')
          .body('Cannot update proxy rule. Check your internet connection.')
          .closable().go();
      }
    }
  }

  async onDeleteProxy(event){
    let result = await this.api.deleteProxy(this.mgProxy.id);
    if (!result.error){
      this.mgProxyDeleted.emit(this.mgProxy);
      this.notification.success()
        .title('Deleted proxy rule.')
        .body('Successfully deleted proxy rule.')
        .closable().go();
    } else {
      this.notification.error()
        .title('Error while deleting proxy rule.')
        .body('Cannot delete proxy rule. Check your internet connection.')
        .closable().go();
    }
  }

}
