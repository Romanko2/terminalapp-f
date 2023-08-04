import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from 'src/app/utils/services/auth.service';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  timeStamp = new FormControl('end')
  selectVal:any;
  isEodChart:boolean = true
  isIntra:boolean = false
 ngOnInit(): void {
   
 }

 eod(){
  this.isEodChart = true
  this.isIntra = false
 }

 intra(){
  this.isIntra = true
  this.isEodChart = false
 }
}
