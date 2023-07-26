import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansModule } from './plans/plans.module';
import { ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path:'plans',
    loadChildren:()=>PlansModule
  },
  {
    path:'profile',
    loadChildren:()=>ProfileModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
