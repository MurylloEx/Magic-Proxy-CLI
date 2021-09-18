import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent, HttpInterceptor } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class ExpirationInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private notification: NotificationService,
    private session: SessionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
      if (!(error.error instanceof ErrorEvent)){
        if ([401, 403].includes(error.status)){
          this.session.deauthenticate();
          this.router.navigateByUrl("/");
          setTimeout(() => {
            this.notification.error()
              .closable().key('logout')
              .title('Session expired!')
              .body('You should provide your credentials again to enter in system.').go();
          }, 300);
        }
      }
      return throwError(error);
    }));
  }

}

export const ExpirationInterceptorService = {
  provide: HTTP_INTERCEPTORS,
  useClass: ExpirationInterceptor,
  multi: true
}