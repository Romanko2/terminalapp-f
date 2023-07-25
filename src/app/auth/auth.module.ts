import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent, ForgotComponent, LoginComponent, ResetComponent, SignupComponent } from './components';



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
