import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  notify(obj: Message){
    setTimeout(() => this.messageService.add(obj), 350);
  }

  error() {
    return (new NotificationBase()).type('error', this);
  }

  success() {
    return (new NotificationBase()).type('success', this);
  }
  
  warning() {
    return (new NotificationBase()).type('warn', this);
  }

  info() {
    return (new NotificationBase()).type('info', this);
  }

}

export class NotificationBase {

  m_Builder: NotificationService;
  m_Severity: string;
  m_MessageData: any = {
    life: 5000
  };

  type(severity: string, builder: NotificationService){
    this.m_Severity = severity;
    this.m_Builder = builder;
    return this;
  }

  key(str: string){
    this.m_MessageData.key = str;
    return this;
  }

  body(str: string){
    this.m_MessageData.detail = str;
    return this;
  }

  append(str: string){
    this.m_MessageData.detail = [].concat(this.m_MessageData.detail).concat(str).join('');
    return this;
  }

  title(str: string){
    this.m_MessageData.summary = str;
    return this;
  }

  notClosable(){
    this.m_MessageData.closable = false;
    return this;
  }

  closable(){
    this.m_MessageData.closable = true;
    return this;
  }

  life(time: number){
    this.m_MessageData.life = time;
    return this;
  }

  go(){
    this.m_Builder.notify({...this.m_MessageData, severity: this.m_Severity});
  }

}