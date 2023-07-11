import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { BehaviorService } from "./behavior.service";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(public router: Router,private toastr: ToastrService,
      private _bs:BehaviorService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          this._bs.load(false)
            let message = "Server Error";
            if(err.error){
              if(err.error.message) message = err.error.message;
              if(err.error.error) message = err.error.error.message;
            }

            this.toastr.error(message,'Error');
           
            if (err.status === 401) {
              this._bs.signOut()
            }
            return throwError(err.error);
        }))
    }
}