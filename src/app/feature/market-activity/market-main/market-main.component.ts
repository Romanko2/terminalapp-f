import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-market-main',
  templateUrl: './market-main.component.html',
  styleUrls: ['./market-main.component.scss']
})
export class MarketMainComponent implements OnInit {

  timeStamp = new FormControl('end')
  selectVal:any;
  isEodChart:boolean = true
  isIntra:boolean = false
 ngOnInit(): void {
   
 }
 activeTab = 1;

 setActiveTab(tabNumber: number) {
   this.activeTab = tabNumber;
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
