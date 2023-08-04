import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketActivityRoutingModule } from './market-activity-routing.module';
import { MarketMainComponent } from './market-main/market-main.component';
import { IntraDayComponent } from './intra-day/intra-day.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';


@NgModule({
  declarations: [
    MarketMainComponent,
    IntraDayComponent,
    StockChartComponent
  ],
  imports: [
    CommonModule,
    MarketActivityRoutingModule
  ]
})
export class MarketActivityModule { }
