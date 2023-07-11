import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    ResetComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
