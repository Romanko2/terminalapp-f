import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  loginForm: FormGroup;
  submitted:any = false;
  showPass:any = false;
  eyes:any={
    password:false,
    newPassword:false,
    confirmPassword:false
  }

  constructor(private fb:FormBuilder,
    private _bs:BehaviorService,
    private frontendService:FrontendService,
    private appService:AppService,
    private router:Router,
    private toastr:ToastrService) {

    // if(_bs.getLocalUser()==null){
    //   router.navigateByUrl('/')
    // }

    this.loginForm = this.fb.group({
      currentPassword: ["", [Validators.required, Validators.minLength(8)]],
      newPassword: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword:["", [Validators.required, Validators.minLength(8)]]
    },
		{
      validator: ConfirmMatch('newPassword', 'confirmPassword')
    });
  }


  ngOnInit(): void {
  }


  updatePasswrd(){
   
  this.submitted = true;
    if(this.loginForm.valid){
      this._bs.load(true);
      this.frontendService.changePassword(this.loginForm.value).subscribe({
        next:(res)=>{
          this._bs.load(false);
          this.toastr.success(res.message)
      
           this.logout()
        },
        error:(err)=>{
          // this.toastr.error(err.message)
        }
      })
  }else{
    this.loginForm.markAllAsTouched()
  }
}


logout() {
  // this._bs.signOut()
  // this.authService.signOut()
  // this.authService.currentUserSource.next(false)
  this._bs.signOut()
}

  get f() { return this.loginForm.controls;}


}
