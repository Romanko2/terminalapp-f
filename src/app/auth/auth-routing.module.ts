import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login'
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'change-password',
    component:ChangePasswordComponent
  },
  {
    path:'forgot',
    component:ForgotComponent
  },
  {
    path:'reset',
    component:ResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
