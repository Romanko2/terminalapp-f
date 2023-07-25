import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';
import { SignupComponent } from './components/signup/signup.component';

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
