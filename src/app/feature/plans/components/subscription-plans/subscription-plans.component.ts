import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {

  constructor(private fs:FrontendService) { }

  ngOnInit(): void {
    this.getAllPlans()
  }
  
  getAllPlans(){
    this.fs.plansList().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }
}
