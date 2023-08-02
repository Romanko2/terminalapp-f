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
  
  public user:any
  _host:any=environment.apiUrl
  constructor(private frontendService:FrontendService,private _bs:BehaviorService,private toastr:ToastrService , private router:Router) { }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this._bs.load(true)
    this.frontendService.viewProfile().subscribe({
      next:(res:any)=>{
        this._bs.load(false)
        this.user = res.data
        console.log(this.user)

      },
      error:(err:any)=>{
        // this.toastr.error(err.message)
      }
    })
  }

  edit(){
  this.router.navigate(['/feature/profile/edit'])
  }
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
