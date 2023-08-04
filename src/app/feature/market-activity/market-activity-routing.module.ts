import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketMainComponent } from './market-main/market-main.component';

const routes: Routes = [
  {
    path: '',
    component: MarketMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketActivityRoutingModule { }
