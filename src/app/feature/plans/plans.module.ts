import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';


@NgModule({
  declarations: [
    SubscriptionPlansComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule
  ]
})
export class PlansModule { }
