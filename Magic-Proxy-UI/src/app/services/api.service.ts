import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private m_ApiAddress: string = window.location.protocol + '//' + window.location.host;
  private m_ApiBase: string = "/v1/api";

  constructor(private http: HttpService) { }

  getApiBase() {
    return this.m_ApiAddress + this.m_ApiBase;
  }

  getProxies() {
    return this.http.get(
      this.getApiBase() + "/proxy",
      { ...HttpService.AuthHeader });
  }

  createProxy(data: any) {
    return this.http.post(
      this.getApiBase() + "/proxy", data,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  updateProxy(id: string, data: any) {
    return this.http.put(
      this.getApiBase() + "/proxy/" + encodeURIComponent(id), data,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  deleteProxy(id: string) {
    return this.http.delete(
      this.getApiBase() + "/proxy/" + encodeURIComponent(id),
      { ...HttpService.AuthHeader });
  }

  getSettings() {
    return this.http.get(
      this.getApiBase() + "/settings",
      { ...HttpService.AuthHeader });
  }

  createSettings(data: any) {
    return this.http.post(
      this.getApiBase() + "/settings", data ,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  deleteSettings(id: string) {
    return this.http.delete(
      this.getApiBase() + "/settings/" + encodeURIComponent(id),
      { ...HttpService.AuthHeader });
  }

  getTls() {
    return this.http.get(
      this.getApiBase() + "/tls",
      { ...HttpService.AuthHeader });
  }

  createTls(data: any) {
    return this.http.post(
      this.getApiBase() + "/tls", data,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  updateTls(id: string, data: any) {
    return this.http.put(
      this.getApiBase() + "/tls/" + encodeURIComponent(id), data,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  deleteTls(id: string) {
    return this.http.delete(
      this.getApiBase() + "/tls/" + encodeURIComponent(id),
      { ...HttpService.AuthHeader });
  }

  getUser() {
    return this.http.get(
      this.getApiBase() + "/users",
      { ...HttpService.AuthHeader });
  }

  createUser(data: any) {
    return this.http.post(
      this.getApiBase() + "/users", data,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  updateUser(id: string, data: any) {
    return this.http.put(
      this.getApiBase() + "/users/" + encodeURIComponent(id), data,
      { ...HttpService.AuthHeader, ...HttpService.JsonHeader });
  }

  deleteUser(id: string) {
    return this.http.delete(
      this.getApiBase() + "/users/" + encodeURIComponent(id),
      { ...HttpService.AuthHeader });
  }

  authLogin(data: any) {
    return this.http.post(
      this.getApiBase() + "/auth", data,
      { ...HttpService.JsonHeader });
  }

}
