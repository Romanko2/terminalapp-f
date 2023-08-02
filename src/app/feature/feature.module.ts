import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureMainComponent } from './feature-main/feature-main.component';

import { FeatureHeaderComponent } from './feature-header/feature-header.component';
import { HomeComponent } from './home/home.component';
import { FeatureFooterComponent } from './feature-footer/feature-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './about-us/about-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerDayComponent } from './per-day/per-day.component';



@NgModule({
  declarations: [
    FeatureMainComponent,
    FeatureHeaderComponent,
    HomeComponent,
    FeatureFooterComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    LineChartComponent,
    PerDayComponent,

  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  providers:[
    DatePipe
  ],
  exports:[
    LineChartComponent,
    FeatureHeaderComponent,
    PerDayComponent
  ]
})
export class FeatureModule { }
