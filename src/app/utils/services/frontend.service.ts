import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { API_CONSTANTS } from "../constants/api.const";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FrontendService {
    private baseUrl = environment.apiUrl
    access_token: any
    id:any
    constructor(private http: HttpClient) {
        this.id = localStorage.getItem('id')
        this.access_token = localStorage.getItem('access_token')
        console.log(this.access_token)
    }

    

    //VIEW-PROFILE//
    viewProfile() {
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.get(`${this.baseUrl}${API_CONSTANTS.viewprofile_url}${this.id}`, { headers })
    }

    //EDIT-PROFILE//
    editProfile(body: any):Observable<any>{
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.put<any>(`${this.baseUrl}${API_CONSTANTS.editprofile_url}`, body , {headers})
    }

    //PLANS_LISTING//
    plansList():Observable<any>{
        let headers = { 'Authorization': 'Bearer ' + this.access_token }
        return this.http.get<any>(`${this.baseUrl}${API_CONSTANTS.plansList_url}` , {headers})
    }
}