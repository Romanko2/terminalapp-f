import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureModule } from '../feature/feature.module';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    StockChartComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FeatureModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
