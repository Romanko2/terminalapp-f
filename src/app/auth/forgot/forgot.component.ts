import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {


  loginForm: FormGroup;
  submitted:any = false;
  showPass:any = false;

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
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls;}

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this._bs.load(true);

    this.appService.add(this.loginForm.value, 'forgot/password').subscribe((res: any) => {
      if (res.success) {
        this._bs.load(false);
        this.router.navigateByUrl('/auth/reset?id='+res.id);
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
