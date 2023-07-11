import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorService } from './behavior.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  protected debug = false;
  token: any;
  currentUserData: any;

  constructor(private _bs:BehaviorService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.currentUserData = this._bs.getLocalUser()

    if (this.currentUserData) {
      let headers = {};
      const token = this.currentUserData.access_token ? this.currentUserData.access_token : '';
      if (token) {
        headers = {
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
        };

        request = request.clone({
          setHeaders: headers
        });
      }
    }

    return next.handle(request);
  }
}