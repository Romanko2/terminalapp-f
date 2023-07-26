import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup
  public showPassword: any = false;
  public submitted: any = false;
  constructor(
    private _bs: BehaviorService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%. +-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  public signup() {
    this.submitted = true
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('user-signup:session' , JSON.stringify(res))
          this.toaster.success(res.message)
   
        },
        error: (err) => {
          this.toaster.error(err.message)
        }
      })
    } else {
      this.signupForm.markAllAsTouched()
    }

  }

  get f() { return this.signupForm.controls }
}
