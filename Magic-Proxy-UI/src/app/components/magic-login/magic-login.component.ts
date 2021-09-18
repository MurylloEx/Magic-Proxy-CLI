import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'magic-login',
  templateUrl: './magic-login.component.html',
  styleUrls: ['./magic-login.component.css']
})
export class MagicLoginComponent implements OnInit {

  @Input() value: any = {
    name: '',
    token: ''
  };
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginRequest: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitChanges(){
    this.valueChange.emit(this.value);
  }

  doLogin(){
    this.loginRequest.emit(this.value);
  }

}
