import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private m_ExpirationHandlerId: any = null;

  constructor(private storage: LocalStorageService) { 
    this.runSessionCountdown();
  }

  getSession(): any {
    return this.storage.get("user_session");
  }

  getToken(): string {
    return this.getSession().Token;
  }

  getRole(): string[] {
    return this.getSession().Role;
  }

  getExtra(): any {
    return this.getSession().Extra;
  }

  isAuthenticated(): boolean {
    return !!this.getSession().Authenticated;
  }

  checkRole(roleName: string): boolean {
    let roles = this.getRole();
    return roles.some(x => 
      x.toLocaleLowerCase().includes(roleName.toLocaleLowerCase()));
  }

  authenticate(Token: string, Role: any, Extra: any, Expiration?: number){
    if (this.isAuthenticated())
      this.deauthenticate();
    if (!Array.isArray(Role)){
      Role = [Role];
    }
    this.storage.set("user_session", {
      ...this.getSession(), 
      Token, 
      Role,
      Extra,
      Authenticated: true, 
      Expire: (+new Date) + (Expiration || 72 * 10 ** 5) //2 Horas (Padrão)
    });
    this.runSessionCountdown();
    return this;
  }

  deauthenticate(){
    if (this.m_ExpirationHandlerId != null){
      clearTimeout(this.m_ExpirationHandlerId);
      this.m_ExpirationHandlerId = null;
    }
    this.storage.del("user_session");
    return this;
  }

  private runSessionCountdown(){
    if (this.isAuthenticated()){
      let session = this.getSession();
      this.m_ExpirationHandlerId = setTimeout(() => {
        this.deauthenticate();
      }, session.Expire - (+new Date));
    }
  }

}