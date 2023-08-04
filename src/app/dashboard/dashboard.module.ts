import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureModule } from '../feature/feature.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TickersChartComponent } from './tickers-chart/tickers-chart.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TickersChartComponent,

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
