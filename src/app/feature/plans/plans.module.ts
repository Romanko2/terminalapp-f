import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardDetailsComponent } from './components/card-details/card-details.component';


@NgModule({
  declarations: [
    SubscriptionPlansComponent,
    CardDetailsComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class PlansModule { }
