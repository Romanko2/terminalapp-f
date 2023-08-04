import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketActivityRoutingModule } from './market-activity-routing.module';
import { MarketMainComponent } from './market-main/market-main.component';


@NgModule({
  declarations: [
    MarketMainComponent
  ],
  imports: [
    CommonModule,
    MarketActivityRoutingModule
  ]
})
export class MarketActivityModule { }
