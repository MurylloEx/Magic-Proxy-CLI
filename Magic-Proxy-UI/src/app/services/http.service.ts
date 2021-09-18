import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public static JsonHeader = { "Content-Type": "application/json" }
  public static AuthHeader = { "X-Authenticated-Route": "true" }

  constructor(private http: HttpClient) { }

  get(url: string, headers?: any): Promise<any>{
    return new Promise((resolve, _reject) => {
      this.http.get(url, {
        headers: {...headers}
      }).subscribe({
        next: resolve,
        error: (e) => resolve(e.error)
      });
    });
  }

  post(url: string, body: any, headers?: any): Promise<any>{
    return new Promise((resolve, _reject) => {
      this.http.post(url, body, {
        headers: {...headers}
      }).subscribe({
        next: resolve,
        error: (e) => resolve(e.error)
      });
    });
  }

  put(url: string, body: any, headers?: any): Promise<any>{
    return new Promise((resolve, _reject) => {
      this.http.put(url, body, {
        headers: {...headers}
      }).subscribe({
        next: resolve,
        error: (e) => resolve(e.error)
      });
    });
  }

  delete(url: string, headers?: any): Promise<any>{
    return new Promise((resolve, _reject) => {
      this.http.delete(url, {
        headers: {...headers}
      }).subscribe({
        next: resolve,
        error: (e) => resolve(e.error)
      });
    });
  }

}