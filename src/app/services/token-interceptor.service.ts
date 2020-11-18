import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  get getToken() {
    return this.auth.getAuthorizationHeaderValue();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.getToken}`
      }
    });
    request.headers.keys().forEach(((key, index, array) => {
      console.log(' ' + key);
      request.headers.getAll(key).forEach(header => console.log( '     ' + header));
    }));
    return next.handle(request);
  }
}

