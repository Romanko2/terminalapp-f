import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CardNumberMaskDirective } from 'src/app/utils/services/mask.directive';
import { CvcValidatorDirective } from 'src/app/utils/cvc.validator';


@NgModule({
  declarations: [
    SubscriptionPlansComponent,
    CardDetailsComponent,
    CardNumberMaskDirective,
    CvcValidatorDirective
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ]
})
export class PlansModule { }
