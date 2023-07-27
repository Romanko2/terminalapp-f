import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  loginForm: FormGroup;
  submitted:any = false;
  showPass:any = false;
  showPass2:any = false;
 public id:any
  constructor(private fb:FormBuilder,
    private _bs:BehaviorService,
    private authService: AuthService,
    private router:Router,
    private toastr:ToastrService) {

    if(_bs.getLocalUser()){
      router.navigateByUrl('/')
    }

    this.loginForm = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(9)]],
      confirmPassword:["", [Validators.required, Validators.minLength(9)]]
    },
		{
      validator: ConfirmMatch('newPassword', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id')
  }

  resetPassword(){
    const body = {
      id:this.id,
      newPassword:this.loginForm.value.newPassword,
      
    }

    this.authService.resetPassword(body).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message)
      },
      error:(err)=>{
        
      }
    })

  }
  get f() { return this.loginForm.controls;}

  // onSubmit(){
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this._bs.load(true);

  //   this.authService.update(this.loginForm.value, 'reset/password').subscribe((res: any) => {
  //     if (res.success) {
  //       this._bs.load(false);
  //       this.router.navigateByUrl('/auth/login');
  //       this.toastr.success(res.message)
  //     } else {
  //       this.toastr.error(res.message)
  //     }
  //     this._bs.load(false)
  //   }, error => {
  //     this._bs.load(false)
  //   });

  // }
}
