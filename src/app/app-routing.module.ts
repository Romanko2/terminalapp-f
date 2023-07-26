import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module'; 
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileModule } from './feature/profile/profile.module'; 
import { AuthGuard } from './shared/auth.guard';
import { LayoutComponent } from './theme/layout/layout.component';
import { FeatureModule } from './feature/feature.module';

const routes: Routes = [

  {
    path:'',
    component: HomeComponent,
    // canActivate:[AuthGuard],
    children :[     
      {
        path:'dashboard',
        loadChildren:()=>DashboardModule
      }
    ]
  },
  {
    path:'feature',
    loadChildren:()=>FeatureModule
  },
 
  {
    path:'auth',
    loadChildren:()=>AuthModule
  },
  { path: '**', 
    component: NotFoundComponent,
  },
  
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
