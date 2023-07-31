import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { API_CONSTANTS } from "../constants/api.const";
import { LOGIN, REGISTER, FORGOTPASSWORD, CHANGEPASSWORD } from "../interface/auth-interface";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { LocalStorageService } from "./local-storage.service";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseUrl = environment.apiUrl
    access_token: any;
    userInfo$ = new BehaviorSubject<any>(null)
    currentUserSource = new BehaviorSubject<any>('')



    constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {
        this.access_token = localStorage.getItem('access_token')
    }





    userLogin(body: LOGIN): Observable<any> {
        return this.http.post<LOGIN>(`${this.baseUrl}${API_CONSTANTS.login_url}`, body).pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSource.next(true)
                    this.localStorageService.saveData("isLoggedIn", 'true')
                    // this.currentUserSource.next(true)
                    this.localStorageService.saveData('id', user.data.id)
                    this.localStorageService.saveData('access_token', user.data.access_token)
                    // this.currentUserSource.next(user);

                }
            })
        )
    }

    //REGISTER//
    register(body: REGISTER): Observable<any> {
        return this.http.post<REGISTER>(`${this.baseUrl}${API_CONSTANTS.signup_url}`, body)
    }

    //FORGOT PASSWORD//
    forgotPassword(body: FORGOTPASSWORD): Observable<any> {
        return this.http.post<FORGOTPASSWORD>(`${this.baseUrl}${API_CONSTANTS.forgotpassword_url}`, body)
    }


    resetPassword(body: any) {
      return this.http.put(`${this.baseUrl}${API_CONSTANTS.reset_url}`, body)
    }

    changePassword(body: CHANGEPASSWORD): Observable<any> {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.put<CHANGEPASSWORD>(`${this.baseUrl}${API_CONSTANTS.changePassword_url}`, body, { headers })
    }

    signOut(): void {
        this.localStorageService.clearData()
        localStorage.setItem('isLoggedIn', 'false');
        // this.currentUserSource.next(false)
        this.router.navigateByUrl('/');

    }

    getToken() :void{
        this.localStorageService.getData('access_token')
    }



}