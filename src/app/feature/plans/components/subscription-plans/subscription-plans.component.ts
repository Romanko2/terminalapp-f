import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  public plansArr:any[] = []
  constructor(private fs:FrontendService , private router:Router) { }

  ngOnInit(): void {
    this.getAllPlans()
  }
  
  getAllPlans(){
    this.fs.plansList().subscribe({
      next:(res)=>{
        this.plansArr = res.data.data
        console.log(this.plansArr)
      }
    })
  }

  choosePlan(key:any){
    this.router.navigate(['/feature/plans/card-details' , {id:key}])
  }
}
