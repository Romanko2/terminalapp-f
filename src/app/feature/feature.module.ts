import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureMainComponent } from './feature-main/feature-main.component';

import { FeatureHeaderComponent } from './feature-header/feature-header.component';
import { HomeComponent } from './home/home.component';
import { FeatureFooterComponent } from './feature-footer/feature-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './about-us/about-us.component';
import { HighchartComponent } from './highchart/highchart.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';


@NgModule({
  declarations: [
    FeatureMainComponent,
    FeatureHeaderComponent,
    HomeComponent,
    FeatureFooterComponent,
    AboutUsComponent,
    HighchartComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    HighchartComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MatIconModule,

  ]
})
export class FeatureModule { }
