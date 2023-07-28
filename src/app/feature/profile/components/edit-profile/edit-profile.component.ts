import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import sharedModel from 'src/models/shared.model';
import { FrontendService } from 'src/app/utils/services/frontend.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userForm: FormGroup;
  user: any
  _host: any = environment.apiUrl
  baseImage: any
  submitted: any
  public id: any
  constructor(private formBuilder: FormBuilder,
    private appService: AppService,
    private fs: FrontendService,
    private toastr: ToastrService,
    private router: Router,
    private _bs: BehaviorService) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]],
      fullName: [''],
    });
    this.id = localStorage.getItem('id')
  }
  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this._bs.load(true)
    this.fs.viewProfile(this.id).subscribe({
      next: (res: any) => {
        this._bs.load(false)
        this.user = res.data
        console.log(this.user)
        this.userForm.patchValue({
          fullName: this.user.fullName ? this.user.fullName : 'NA',
          email: this.user.email ? this.user.email : 'NA',
          mobileNo: this.user.mobileNo.number ? this.user.mobileNo.number : 'NA',
          dialCode: this.user.mobileNo.dialCode ? this.user.mobileNo.dialCode : 'NA'
        })
      },
      error: (err: any) => {
        // this.toastr.error(err.message)
      }
    })
  }

  updateUser() {
    const body = {
      fullName: this.userForm.value.fullName,
      id: this.id,
      mobileNo: this.userForm.value.mobileNo
    }
    this.fs.editProfile(body).subscribe({
      next: (res) => {
        this.toastr.success(res.message)
        this.router.navigateByUrl('/feature/profile/view-profile')
      },
      error: (err) => {
        this.toastr.error(err)
      }
    })
  }




  get f() { return this.userForm.controls; }

  removeImage(img: any) {

  }

  imageUploading: any = false
  updateImage(e: any) {
    let files = e.target.files
    let fdata = {
      modelName: 'users',
      file: files.item(0)
    }
    this.imageUploading = true
    this.appService.uploadImage('upload/image?modelName=users', fdata).subscribe(res => {
      if (res.success) {
        let image = res.data.fullpath
        this.user.image = image

        this.fs.editProfile({ id: this.user.id, image }).subscribe(res => {
          console.log(res, "response")
          if (res.success) {
            this._bs.setUserData({ image })
          }
          this.imageUploading = false
        }, err => {
          this.imageUploading = false
        })
      } else {
        this.imageUploading = false
      }
    }, err => {
      this.imageUploading = false
    })
  }

  userImg(img: any) {
    let value = './assets/img/profile.jpg';

    if (img && img.includes('https://')) {
      value = img;
    }
    else if (img) {
      value = this._host + 'images/users/' + img
    }

    return value;
  }

  updating: any = false
  onSubmit() {
    this.submitted = true
    let value = this.userForm.value

    if (this.userForm.valid) {
      let payload = {
        fullName: value.fullName,
        dialCode: value.mobileNo.dialCode,
        mobileNo: value.mobileNo.number,
        countryCode: value.mobileNo.countryCode,
      }

      console.log("value", value)
      console.log("payload", payload)
      this.updating = true
      this.appService.update({ id: this.user.id, ...payload }, 'admin/edit/profile').subscribe(res => {
        if (res.success) {
          this._bs.setUserData(payload)
          this.toastr.success('Profile Updated Successfully')
          this.router.navigateByUrl('/profile')
        }
        this.updating = false
      }, err => {
        this.updating = false
      })
    }
  }
}
