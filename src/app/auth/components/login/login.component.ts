import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  public userRole: any;
  remember: any = false;
  rmCheck: any;
  emailInput: any
  constructor(private fb: FormBuilder,
    private _bs: BehaviorService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private localStorageService: LocalStorageService, private appService: AppService) {

    if (_bs.getLocalUser()) {
      router.navigateByUrl('/')
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%. +-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem('userSignup:session') as string)
    this.userRole = userDetails?.data.role
    this.rmCheck = document.getElementById("rememberMe"),
      this.emailInput = document.getElementById("ema")
    if (this.remember) {
      this.remember = true
      this.loginForm.patchValue(JSON.parse(this.remember))
    }

    const getData = localStorage.getItem('remember')
    const data = JSON.parse(localStorage.getItem('remember')!)
    console.log(data)
    if (getData) {
      this.loginForm.patchValue({
        email: data.email,
        password: data.password
      })
    }
  }



  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this._bs.load(true);
    let value = this.loginForm.value

    this.appService.add(value, 'user/signin').subscribe((res: any) => {

      if (res.success) {
        this.localStorageService.saveData('id', res.data.id)
        this.localStorageService.saveData('access_token', res.data.access_token)
        this.router.navigateByUrl('/')
        if (this.remember) {
          localStorage.setItem('remember', JSON.stringify(value))
        } else {
          localStorage.removeItem('remember')
        }
        const result = res.data;
        this._bs.load(false);
        this._bs.setUserData(result)
        this.loginForm.reset();
      
      } else {
        // this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }

  lsRememberMe() {
    // if (rmCheck.checked && emailInput.value !== "") {
    //   localStorage.username = emailInput.value;
    //   localStorage.checkbox = rmCheck.value;
    // } else {
    //   localStorage.username = "";
    //   localStorage.checkbox = "";
    // }
  }
}