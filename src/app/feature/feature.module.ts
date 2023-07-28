import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureMainComponent } from './feature-main/feature-main.component';
import { HeaderComponent } from '../theme/header/header.component';
import { FeatureHeaderComponent } from './feature-header/feature-header.component';
import { HomeComponent } from './home/home.component';
import { FeatureFooterComponent } from './feature-footer/feature-footer.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    FeatureMainComponent,
    FeatureHeaderComponent,
    HomeComponent,
    FeatureFooterComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    MatIconModule,
 
  ]
})
export class FeatureModule { }
