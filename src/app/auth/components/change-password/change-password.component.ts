import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { ConfirmMatch } from 'src/app/shared/confirm-match.validator';
import { AuthService } from 'src/app/utils/services/auth.service';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordFrom: FormGroup;
  submitted: any = false;
  showPass: any = false;
  eyes: any = {
    password: false,
    newPassword: false,
    confirmPassword: false
  }

  constructor(private fb: FormBuilder,
    private _bs: BehaviorService,
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {

    // if(_bs.getLocalUser()==null){
    //   router.navigateByUrl('/')
    // }

    this.changePasswordFrom = this.fb.group({
      currentPassword: ["", [Validators.required, Validators.minLength(9)]],
      newPassword: ["", [Validators.required, Validators.minLength(9)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(9)]]
    },
      {
        validator: ConfirmMatch('newPassword', 'confirmPassword')
      });
  }

  ngOnInit(): void {
  }

  get f() { return this.changePasswordFrom.controls; }

  changePassword() {
    this._bs.load(true)
    if (this.changePasswordFrom.valid) {
      this.authService.changePassword(this.changePasswordFrom.value).subscribe({
        next: (res) => {
          this._bs.load(false)
          this.toastr.success(res.message)
        },
        error:(err)=>{
          this.toastr.error(err.message)
        }
      })
    }else{
      this.changePasswordFrom.markAllAsTouched()
    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.changePasswordFrom.invalid) {
      return;
    }

    this._bs.load(true);

    this.appService.update(this.changePasswordFrom.value, 'change/password').subscribe((res: any) => {
      if (res.success) {
        this._bs.load(false);
        this._bs.signOut()
        this.toastr.success(res.message)
      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }
}
