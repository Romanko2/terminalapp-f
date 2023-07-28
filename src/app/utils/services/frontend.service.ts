import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { API_CONSTANTS } from "../constants/api.const";
import { BehaviorSubject, Observable } from "rxjs";
import { CHANGEPASSWORD } from "../interface/auth-interface";

@Injectable({
    providedIn: 'root'
})

export class FrontendService {
    private baseUrl = environment.apiUrl
    access_token: any
    isPurchased$ = new BehaviorSubject<any>(true)
    id: any
    constructor(private http: HttpClient) {
        this.id = localStorage.getItem('id')
        this.access_token = localStorage.getItem('access_token')
        console.log(this.access_token)
    }

    changePassword(body: CHANGEPASSWORD): Observable<any> {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.put<CHANGEPASSWORD>(`${this.baseUrl}${API_CONSTANTS.changePassword_url}`, body, { headers })
    }


    //VIEW-PROFILE//
    viewProfile() {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.get(`${this.baseUrl}${API_CONSTANTS.viewprofile_url}${this.id}`, { headers })
    }

    //EDIT-PROFILE//
    editProfile(body: any): Observable<any> {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.put<any>(`${this.baseUrl}${API_CONSTANTS.editprofile_url}`, body, { headers })
    }

    //PLANS_LISTING//
    plansList(): Observable<any> {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.get<any>(`${this.baseUrl}${API_CONSTANTS.plansList_url}`, { headers })
    }

    //ADDCARD//
    addCard(body:any){
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.post<any>(`${this.baseUrl}${API_CONSTANTS.card_url}`, body , { headers })
    }

    purchasePlan(body:any){
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.post<any>(`${this.baseUrl}${API_CONSTANTS.purchaseplan_url}`, body , { headers })
    }

    getCards(){
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.get<any>(`${this.baseUrl}getCards`,{ headers })
    }
  
      
  
}