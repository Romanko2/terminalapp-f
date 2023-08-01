import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  activPlan:boolean=false
  public user:any
  public activePlanDetails:any;
  public userDetails:any
  id:any
  _host:any=environment.apiUrl
  constructor(private frontendService:FrontendService,private _bs:BehaviorService,private toastr:ToastrService , private router:Router) {
    this.id = localStorage.getItem('id')
   }

  ngOnInit(): void {
    this.getUserData()
    this.id = localStorage.getItem('id')
    this.getgraph()
    // if(this.id){
    //   this.getActivePlan()
    // }
  }

  getUserData(){
    this._bs.load(true)
    this.frontendService.viewProfile(this.id).subscribe({
      next:(res:any)=>{
        this._bs.load(false)
        this.userDetails = res
        console.log(this.userDetails)
        this.user = res.data
        this.activPlan=res.activPlan
        this.activePlanDetails = res.activPlanDetails
        console.log(this.activePlanDetails)

      },
      error:(err:any)=>{
        // this.toastr.error(err.message)
      }
    })
  }


  edit(){
  this.router.navigate(['/feature/profile/edit'])
  }
  getgraph(){
    let data={
      symbol:'TSLA',
      limit:10,
      offset:10
    }
    this.frontendService.getgraph('End_of_Day',data).subscribe({
      next:(res:any)=>{
      },
      error:(err:any)=>{
        // this.toastr.error(err.message)
      }
    })
  }

  // getActivePlan(){
  //   this.frontendService.activePlan(this.id).subscribe({
  //     next:(res)=>{
  //       this.activePlanDetails = res.data
  //       console.log(this.activePlanDetails)
  //     }
  //   })
  // }
  // getData(){
    
  //   this.appService.getAll('profile').subscribe(res=>{
  //     if(res.success){
  //       this.user=res.data
  //     }
   
  //   })
  // }

  userImg(img:any){
    let value = './assets/img/profile.jpg';

    if(img && img.includes('https://')){
      value = img;
    }
    else if(img){
      value = this._host+'images/users/'+img
    }

    return value;
  }

  imageUploading:any=false
  // updateImage(e:any){
  //   let files=e.target.files
  //   let fdata={
  //     modelName:'users',
  //     file:files.item(0)
  //   }
  //   this.imageUploading=true
  //   this.appService.uploadImage('upload/image?modelName=users',fdata).subscribe(res=>{
  //     if(res.success){
  //       let image=res.data.fullpath
  //       this.user.image=image
        
  //       this.appService.update({id:this.user.id,image},'admin/edit/profile').subscribe(res=>{
  //         if(res.success){
  //           this._bs.setUserData({image})
  //         }
  //         this.imageUploading=false
  //       },err=>{
  //         this.imageUploading=false
  //       })
  //     }else{
  //       this.imageUploading=false
  //     }
  //   },err=>{
  //     this.imageUploading=false
  //   })
  // }

}
