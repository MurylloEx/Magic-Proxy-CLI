import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private m_Storage: Storage = window.localStorage;

  constructor() { }

  get(key): any {
    let item = this.m_Storage.getItem(key);
    if (!item)
      return {};
    return JSON.parse(atob(item));
  }

  set(key, value) {
    if (!value)
      return;
    this.m_Storage.setItem(key, btoa(JSON.stringify(value) || ''));
  }
  
  del(key){
    this.m_Storage.removeItem(key);
  }

  clear() {
    this.m_Storage.clear();
  }
}