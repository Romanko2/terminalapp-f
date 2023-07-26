import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from 'src/app/utils/services/auth.service';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: any = false;
  public showPass: any = false;
  public userRole:any;
  remember: any = false;

  constructor(private fb: FormBuilder,
    private _bs: BehaviorService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private localStorageService:LocalStorageService) {

    if (_bs.getLocalUser()) {
      router.navigateByUrl('/')
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%. +-]+@[a-z0-9.-]+\\.[a-z]{2,4}.$")]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let userDetails =  JSON.parse(localStorage.getItem('userSignup:session') as string)
    this.userRole = userDetails?.data.role
    console.log(this.userRole , "role")
    // if (remember) {
    //   this.remember = true
    //   this.loginForm.patchValue(JSON.parse(remember))
    // }
  }

  public login() {
    this.submitted = true
    this._bs.load(false);    if (this.loginForm.valid) {
      this.authService.userLogin(this.loginForm.value).subscribe({
        next: (res:any) => {
          this.toaster.success('Successfully Logged In')
          localStorage.setItem('user:session' , JSON.stringify(res))
          this.authService.currentUserSource.next(true)
          // this.localStorageService.saveData('id' , res.data.id)
          // this.authService.currentUserSource.next(res.data.id)
          // localStorage.setItem('access_token' , res.data.access_token)
          this.router.navigate(['/profile/view-profile'])
          this._bs.load(true);
        },
        error: (err) => {
          this.toaster.error(err.message)
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }

  }
  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this._bs.load(true);
  //   let value = this.loginForm.value

  //   this.appService.add(value, 'admin/signin').subscribe((res: any) => {
  //     if (res.success) {
  //       if (this.remember) {
  //         localStorage.setItem('remember', JSON.stringify(value))
  //       } else {
  //         localStorage.removeItem('remember')
  //       }
  //       const result = res.data;
  //       this._bs.load(false);
  //       this._bs.setUserData(result)
  //       this.loginForm.reset();
  //       this.router.navigate(['/']);

  //     } else {
  //       // this.toastr.error(res.message)
  //     }
  //     this._bs.load(false)
  //   }, error => {
  //     this._bs.load(false)
  //   });

  // }

}
