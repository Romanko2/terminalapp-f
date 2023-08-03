import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'stock-chart',
    component:StockChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
