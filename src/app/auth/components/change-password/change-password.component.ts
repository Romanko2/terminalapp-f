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
      currentPassword: ["", [Validators.required, Validators.minLength(9)]],
      newPassword: ["", [Validators.required, Validators.minLength(9)]],
      confirmPassword:["", [Validators.required, Validators.minLength(9)]]
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
      this.frontendService.changePassword(this.loginForm.value).subscribe({
        next:(res)=>{
          this._bs.load(true);
          this.toastr.success(res.message)
          this._bs.load(false);
          this.router.navigateByUrl('/feature/profile/view-profile')
        },
        error:(err)=>{
          // this.toastr.error(err.message)
        }
      })
  }else{
    this.loginForm.markAllAsTouched()
  }
}

  get f() { return this.loginForm.controls;}


}
