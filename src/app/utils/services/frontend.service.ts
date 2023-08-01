import { HttpClient, HttpParams } from "@angular/common/http";
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
      
    }
// ngOnInit(){
//     this.id = localStorage.getItem('id')
//     console.log(this.id)
// }
    changePassword(body: CHANGEPASSWORD): Observable<any> {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.put<CHANGEPASSWORD>(`${this.baseUrl}${API_CONSTANTS.changePassword_url}`, body, { headers })
    }


    //VIEW-PROFILE//
    viewProfile(id:any) {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.get(`${this.baseUrl}${API_CONSTANTS.viewprofile_url}${id}`, { headers })
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
  
      
  getPlanById(id:any){
    let headers = { 'Authorization': 'Bearer ' + this.access_token }
    return this.http.get<any>(`${this.baseUrl}subscriptionplan?id=${id}`,{ headers })
  }

  activePlan(id:any){
    let headers = { 'Authorization': 'Bearer ' + this.access_token }
    return this.http.get<any>(`${this.baseUrl}${API_CONSTANTS.activePlan_url}${id}`,{ headers })
  }

  deleteCards(card_id:any){
    let headers = { 'Authorization': 'Bearer ' + this.access_token }
    return this.http.delete<any>(`${this.baseUrl}Cards?card_id=${card_id}`,{ headers })
  }
  
  primaryCard(body:any){
    let headers = { 'Authorization': 'Bearer ' + this.access_token }
    return this.http.put<any>(`${this.baseUrl}primary/card`, body,{ headers })
  }

  getgraph(url:any,param:any){
    let params = this.getParams(param)
    let headers = { 'Authorization': 'Bearer ' + this.access_token }
    return this.http.get<any>(`${this.baseUrl}${url}`, { headers ,params:params})
  }
//   getActivePlans(){
//     let headers = { 'Authorization': 'Bearer ' + this.access_token }
//     return this.http.get(`${this.baseUrl}purchaseplans?page=1&count=3` , {headers})
//   }
getParams(parameters:any) {
    let params = new HttpParams();
    Object.keys(parameters).map((key) => {
      params = params.set(key, parameters[key]);
    })
    return params;
  }
}