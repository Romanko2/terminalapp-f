import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import sharedModel from 'src/models/shared.model';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userForm:FormGroup;
  user:any
  _host:any=environment.apiUrl
  baseImage:any
  submitted:any
  constructor(private formBuilder:FormBuilder,
    private appService:AppService,
    private toastr:ToastrService,
    private router:Router,
    private _bs:BehaviorService) {
    this.userForm = this.formBuilder.group({
      role: ['admin'],
      email: ['', [Validators.required, Validators.email]], 
      mobileNo:['',[ Validators.required]],
      fullName:[''],
    });
   }

  ngOnInit(): void {
    // this.getData()
  }

  updateUser(){}

  getData(){
    this._bs.load(true)
    this.appService.getAll('profile').subscribe(res=>{
      if(res.success){
        this.user=res.data
        let data=res.data
        data.mobileNo=sharedModel.getTelInputValue(data)
        this.userForm.patchValue(res.data)
      }
      this._bs.load(false)
    })
  }

  get f() { return this.userForm.controls; }

  removeImage(img:any){

  }

  imageUploading:any=false
  updateImage(e:any){
    let files=e.target.files
    let fdata={
      modelName:'users',
      file:files.item(0)
    }
    this.imageUploading=true
    this.appService.uploadImage('upload/image?modelName=users',fdata).subscribe(res=>{
      if(res.success){
        let image=res.data.fullpath
        this.user.image=image
        
        this.appService.update({id:this.user.id,image},'admin/edit/profile').subscribe(res=>{
          if(res.success){
            this._bs.setUserData({image})
          }
          this.imageUploading=false
        },err=>{
          this.imageUploading=false
        })
      }else{
        this.imageUploading=false
      }
    },err=>{
      this.imageUploading=false
    })
  }

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

  updating:any=false
  onSubmit(){
    this.submitted=true
    let value=this.userForm.value
   
    if(this.userForm.valid){
      let payload={
        fullName:value.fullName,
        dialCode:value.mobileNo.dialCode,
        mobileNo:value.mobileNo.number,
        countryCode:value.mobileNo.countryCode,
      }

      console.log("value",value)
      console.log("payload",payload)
      this.updating=true
      this.appService.update({id:this.user.id,...payload},'admin/edit/profile').subscribe(res=>{
        if(res.success){
          this._bs.setUserData(payload)
          this.toastr.success('Profile Updated Successfully')
          this.router.navigateByUrl('/profile')
        }
        this.updating=false
      },err=>{
        this.updating=false
      })
    }
  }
}
