import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';

const routes: Routes = [
  {
    path:'',
    component:SubscriptionPlansComponent
  },
  {
    path:'card-details',
    component:CardDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
