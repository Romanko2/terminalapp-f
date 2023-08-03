import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureModule } from '../feature/feature.module';



@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FeatureModule
  ]
})
export class DashboardModule { }
