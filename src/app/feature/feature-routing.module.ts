import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansModule } from './plans/plans.module';
import { ProfileModule } from './profile/profile.module';
import { FeatureMainComponent } from './feature-main/feature-main.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { HighchartComponent } from './highchart/highchart.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MarketActivityModule } from './market-activity/market-activity.module';


const routes: Routes = [
  {
    path:'',
    component:FeatureMainComponent,
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'plans',
        loadChildren:()=>PlansModule
      },
      {
        path:'profile',
        loadChildren:()=>ProfileModule
      },
      {
        path:'market-activity',
        loadChildren:()=>MarketActivityModule
      },
      {
        path:'about-us',
        component:AboutUsComponent
      },
      {
        path:'privacy-policy',
        component:PrivacyPolicyComponent
      },
      {
        path:'terms-and-conditions',
        component:TermsAndConditionsComponent
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
