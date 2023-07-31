import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class BehaviorService {

    public userData = new BehaviorSubject<any>(null);

    rootUrl: string = environment.apiUrl;
    constructor(private router: Router) {}

    signOut(): void {
        this.router.navigateByUrl('/auth/login');
        localStorage.removeItem('credentials')
        this.setUserData(null)
    }

    setUserData(data:any) {
        let value={
            ...this.getLocalUser(),
            ...data
        }
        if(data){
           let user = JSON.stringify(value)
           localStorage.setItem('credentials', user)
          
           this.userData.next(value);
        }else{
            localStorage.removeItem('credentials');
            this.userData.next('');
        }
    }

    getLocalUser(){
        let data:any;
        let user:any = localStorage.getItem('credentials')
        if(user) data = JSON.parse(user)
        return data;
    }

    getUserData() {
        return this.userData.asObservable();
    }

    load(p:any){
        if(p){
            this.loadOn()
        }else{
            this.loadOff()
        }
    }

    closeModal() {
        document.getElementById('body')?.classList.remove('modal-open');
    }

    openModal() {
        document.getElementById('body')?.classList.add('modal-open');
    }

    loadOn() {
        document.getElementById('loaderDiv')?.classList.remove('d-none');
    }

    loadOff() {
        document.getElementById('loaderDiv')?.classList.add('d-none');
    }



    // Date methods

    getIso:any =(p:any)=>{
        let date:any = new Date(p);
        let d:Date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        return d.toISOString();
    }

    getBsd:any =(date:any)=>{
        let d = new Date(date);
        return {
          day: d.getDate(),
          month:d.getMonth()+1,
          year:d.getFullYear()
        }
    }

    getTime:any =(p:any)=>{
        let date:any = new Date(p);
        let d:any = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return d.getTime();
    }

    incDays:any =(p:any, days:any)=>{
        let value:any = '';
        let d:any = new Date(p);
        let d1:any = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        let d2:any = new Date();
     
        value = d2.setDate(d1.getDate()+days);
        return value;
    }

    decDays:any =(p:any, days:any)=>{
        let value:any = '';
        let d:any = new Date(p);
        let d1:any = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        let d2:any = new Date();
     
        value = d2.setDate(d1.getDate()-days);
        return value;
    }

    getAgeError:any = (date:any, year:any)=>{
        let current = new Date();
        let maxDate:Date = new Date();
        maxDate.setFullYear(current.getFullYear() - year);
        let value = false;
        let dob = new Date(date)
    
        if(dob && maxDate.getTime()<dob.getTime()){
          value = true;
        }
    
        return value;
    }

    getIsoToDate:any =(p:any)=>{
        let d = new Date(p);
        let value = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
        return value;
    }

    getDateError:any = (p:any = '')=>{
        let dob:any = p;
        let isError = false;

        // date formate should be MM/DD/YYYY
       
        if(dob){
          dob = dob.split('/');
          if(dob.length>=3){
            if(Number(dob[0]) == NaN) isError = true;
            if(Number(dob[1]) == NaN) isError = true;
            if(Number(dob[2]) == NaN) isError = true;
          }else{
            isError = true;
          }
    
          if(Number(dob[0])>12) isError = true;
          if(Number(dob[1])>31) isError = true;
          if(Number(dob[2])<1800) isError = true;
        }
        return isError;
    }

    currentDate = new Date();

    getDays:any =(checkin:any = this.currentDate, checkout:any = this.currentDate)=>{
        let value = 0;
        let date = new Date(this.getIso(checkin));
        let currentDate = new Date(this.getIso(checkout?checkout:checkin));
        let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
        value = days==0?1:days;
        return value;
    }

    getDateArray:any = (strDate:any = this.currentDate, endDate:any = this.currentDate, total:any = 0) => {
        let dArray:any = [];
        let sDate =  new Date(strDate);
    
        let eDate:any = new Date(endDate);
        eDate = eDate?eDate:sDate;
    
        if(sDate.getTime() == eDate.getTime()){
          dArray.push(new Date (sDate));
        }else{
          for(let i=0;i<=total;i++) {
            // Adding the date to array
            // Increment the date by 1 day
            dArray.push(new Date (sDate));
            sDate.setDate(sDate.getDate() + 1); 
          }
        }
    
        return dArray;
      }
}
