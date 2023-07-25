import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONSTANTS } from "../constants/api.const";
import { LOGIN, REGISTER, FORGOTPASSWORD, CHANGEPASSWORD } from "../interface/auth-interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseUrl = environment.apiUrl
    access_token: any
    constructor(private http: HttpClient) {
        this.access_token = localStorage.getItem('access_token')
    }
    //Login//
    userLogin(body: LOGIN): Observable<any> {
        return this.http.post<LOGIN>(`${this.baseUrl}${API_CONSTANTS.login_url}`, body)
    }

    //REGISTER//
    register(body: REGISTER): Observable<any> {
        return this.http.post<REGISTER>(`${this.baseUrl}${API_CONSTANTS.signup_url}`, body)
    }

    //FORGOT PASSWORD//
    forgotPassword(body: FORGOTPASSWORD): Observable<any> {
        return this.http.post<FORGOTPASSWORD>(`${this.baseUrl}${API_CONSTANTS.forgotpassword_url}`, body)
    }
   

    resetPassword(body:any){
    
    }

    changePassword(body:CHANGEPASSWORD):Observable<any>{
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.put<CHANGEPASSWORD>(`${this.baseUrl}${API_CONSTANTS.changePassword_url}` , body , {headers})
    }
}