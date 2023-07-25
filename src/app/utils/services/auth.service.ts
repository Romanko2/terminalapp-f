import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONSTANTS } from "../constants/api.const";
import { LOGIN, REGISTER, FORGOTPASSWORD } from "../interface/auth-interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseUrl = environment.apiUrl
    constructor(private http: HttpClient) {

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

}