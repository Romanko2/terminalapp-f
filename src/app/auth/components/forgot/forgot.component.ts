import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  public forgotForm!: FormGroup;
  public submitted: any = false;
  public showPass: any = false;

  constructor(
    private fb: FormBuilder,
    private _bs: BehaviorService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (_bs.getLocalUser()) {
      router.navigateByUrl('/');
    }

    this.forgotForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%. +-]+@[a-z0-9.-]+\\.[a-z]{2,4}.$'),
        ],
      ],
    });
  }

  ngOnInit(): void { }

  public forgot() {
    this.submitted = true;
    if(this.forgotForm.valid){
      this.authService.forgotPassword(this.forgotForm.value).subscribe({
        next:(res)=>{
          this.toastr.success(res.message)
          this.router.navigate(['/auth/reset'], { queryParams: { id: res.id } });
        },
        error:(err)=>{
          this.toastr.error(err.message)
        }
      })
    }
    
  }
  get f() {
    return this.forgotForm.controls;
  }


  // onSubmit() {

  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this._bs.load(true);

  //   this.appService.add(this.loginForm.value, 'forgot/password').subscribe(
  //     (res: any) => {onSubmit() {

  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this._bs.load(true);

  //   this.appService.add(this.loginForm.value, 'forgot/password').subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this._bs.load(false);
  //         this.router.navigateByUrl('/auth/reset?id=' + res.id);
  //         this.toastr.success(res.message);
  //       } else {
  //         this.toastr.error(res.message);
  //       }
  //       this._bs.load(false);
  //     },
  //     (error) => {onSubmit() {

  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this._bs.load(true);

  //   this.appService.add(this.loginForm.value, 'forgot/password').subscribe(
  //     (res: any) => {
  //       if (res.success) {
  //         this._bs.load(false);
  //         this.router.navigateByUrl('/auth/reset?id=' + res.id);
  //         this.toastr.success(res.message);
  //       } else {
  //         this.toastr.error(res.message);
  //       }
  //       this._bs.load(false);
  //     },
  //     (error) => {
  //       this._bs.load(false);
  //     }
  //   );
  // }
  //       this._bs.load(false);
  //     }
  //   );
  // }
  //       if (res.success) {
  //         this._bs.load(false);
  //         this.router.navigateByUrl('/auth/reset?id=' + res.id);
  //         this.toastr.success(res.message);
  //       } else {
  //         this.toastr.error(res.message);
  //       }
  //       this._bs.load(false);
  //     },
  //     (error) => {
  //       this._bs.load(false);
  //     }
  //   );
  // }
}
