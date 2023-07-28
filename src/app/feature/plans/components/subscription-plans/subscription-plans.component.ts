import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  public plansArr:any[] = []
  access_token:any
  activeplan:any
  constructor(private fs:FrontendService , private router:Router , private toastr:ToastrService) { }

  ngOnInit(): void {
   
    this.access_token = localStorage.getItem('access_token')
    if(this.access_token){
      this.getAllPlans()
    }
  }
  
  getAllPlans(){
    this.fs.plansList().subscribe({
      next:(res)=>{
        this.plansArr = res.data.data
        let plan=this.plansArr.find((item:any)=>item.isPurchased==true)
        if(plan){
          console.log(plan,"plannnnnnnnnnnnnnn")
          this.activeplan=plan.id
        }else{
          delete this.activeplan
        }
        console.log(this.plansArr)
      }
    })
  }

  choosePlan(key:any){
    if(this.access_token){
      this.router.navigate(['/feature/plans/card-details' , {id:key}])
    } else {
      this.router.navigateByUrl('/auth/login')
    }

  }
}
