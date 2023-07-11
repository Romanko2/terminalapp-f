import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted:any = false;
  showPass:any = false;
  remember:any = false;
  
  constructor(private fb:FormBuilder,
    private _bs:BehaviorService,
    private appService:AppService,
    private router:Router,
    private toastr:ToastrService) {

    if(_bs.getLocalUser()){
      router.navigateByUrl('/')
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%. +-]+@[a-z0-9.-]+\\.[a-z]{2,4}.$")]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let remember=localStorage.getItem('remember')
    if(remember){
      this.remember=true
      this.loginForm.patchValue(JSON.parse(remember))
    }
  }

  get f() { return this.loginForm.controls;}

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this._bs.load(true);
    let value=this.loginForm.value

    this.appService.add(value, 'admin/signin').subscribe((res: any) => {
      if (res.success) {
        if(this.remember){
          localStorage.setItem('remember',JSON.stringify(value))
        }else{
          localStorage.removeItem('remember')
        }
        const result = res.data;
        this._bs.load(false);
        this._bs.setUserData(result)
        this.loginForm.reset();
        this.router.navigate(['/']);

      } else {
        this.toastr.error(res.message)
      }
      this._bs.load(false)
    }, error => {
      this._bs.load(false)
    });

  }

}
