import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers = request.headers; 

    if (headers.has('x-authenticated-route')){
      if (headers.get('x-authenticated-route') == 'true'){
        if (this.session.isAuthenticated()){
          headers = headers.set('Authorization', 'Bearer ' + this.session.getToken());
        }
        headers = headers.delete('x-authenticated-route');
      }
    }
    
    const newRequest = request.clone({ headers: headers });
    return next.handle(newRequest);
  }

}

export const JwtAuthInterceptorService = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtAuthInterceptor,
  multi: true
}
