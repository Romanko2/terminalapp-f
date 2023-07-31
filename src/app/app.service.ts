import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from '../environments/environment';
import { FORGOTPASSWORD, LOGIN, REGISTER } from './utils/interface/auth-interface';
import { API_CONSTANTS } from './utils/constants/api.const';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _baseUrl = environment.apiUrl;
  private baseUrl = environment.apiUrl
  rootUrl: any;
  http: any;
  headers:any
  access_token:any

  constructor(private httpClient: HttpClient) {
  this.access_token = localStorage.getItem('access_token')
  
  console.log(this.access_token)
  }

  

  uploadImage(url: any, fdata: any) {
    let headers = { 'Authorization': 'Bearer ' + this.access_token }
    const formData: FormData = new FormData();
    // formData.append('data', fileToUpload, fileToUpload.name);
    let oarr = Object.keys(fdata)
    oarr.map(itm => {
      formData.append(itm, fdata[itm])
    })
    return this.httpClient.post(this._baseUrl + url, formData , {headers}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // uploadMultipe(fileToUpload: File,type) {
  //   let params = '?modelName='+type
  //   const formData: FormData = new FormData();
  //   formData.append('data', fileToUpload, fileToUpload.name);
  //   formData.append('modelName',type);
  //   return this.httpClient.post(this._baseUrl + `multiple/images`+params,formData).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  getNotification(url: any) {
    return this.httpClient.get(this._baseUrl + 'notifications').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  deleteNoti(param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'notification', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }
  // getMessages(url:any, param?:any) {
  //   // let params = this.getParams(param)
  //   return this.httpClient.get(this._baseUrl + 'notifications', { params: {} }).pipe(
  //     map((response: any) => {
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   )
  // }
  getAuthorizationHeader() {
    throw new Error("Method not implemented.");
  }
  allApi(url: any = '', context: any = {}, method: any = 'get') {
    if (method == 'post') {
      return this.add(context, url)
    } else if (method == 'put') {
      return this.update(context, url)
    } else if (method == 'delete') {
      return this.deleteRecord(context, url)
    }
    return this.getAll(url, context);
  }

  add(context: any, url: any) {
    return this.httpClient.post(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  update(context: any, url: any) {
    return this.httpClient.put(this._baseUrl + url, context).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getAll(url: any, param?: any, baseUrl: any = '') {
    let params = new HttpParams();
    let _baseUrl = baseUrl ? baseUrl : this._baseUrl;
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.get(_baseUrl + url, { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getAllAmenities(url: any) {
    return this.httpClient.get(this._baseUrl + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  status(id: any, model: any, status: any) {
    let url = this._baseUrl + 'changeStatus?id=' + id + '&model=' + model + '&status=' + status;

    return this.httpClient.put(url, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  deleteRecord(param?: any, url: any = 'delete') {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + url, { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  deleteRecordPermanent(param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'permanent', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  moveBackRecord(param?: any) {
    let params = new HttpParams();
    if (param) {
      for (let key of Object.keys(param)) {
        params = params.set(key, param[key])
      }
    }
    return this.httpClient.delete(this._baseUrl + 'delete/undo', { params: params }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }

  getTotalCount(url: any) {
    return this.httpClient.get(this._baseUrl + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    )
  }


  markRead(url: any) {
    return this.httpClient.put(this._baseUrl + url, '').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getParams(parameters: any) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    })
    return params;
  }

  


  handleError(error: HttpErrorResponse) {
    console.log(error);
    let iserror = false;
    let message = '';
    if (error.error.code == 401) {
      iserror = true;
      message = error.error.message == 'authorization' ? "Your session has been expired" : error.error.message
      // message = error.error.message;
    } else if (error.error.code == 404) {
      iserror = true;
      message = error.error.message;
    } else if (error.error.code == 400) {
      iserror = true;
      message = error.error.message;
    } else if (error.error.code == 500) {
      iserror = true;
      message = error.error.message;
    }
    else if (error.error.code == "E_INVALID_NEW_RECORD") {
      iserror = true;
      message = 'You entered invalid Email';
    }

    return throwError(message ? message : 'Something bad happened; please try again later.');

  }
}
