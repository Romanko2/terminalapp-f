import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module'; 
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileModule } from './profile/profile.module'; 
import { AuthGuard } from './shared/auth.guard';
import { LayoutComponent } from './theme/layout/layout.component';

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
    path:'profile',
    loadChildren:()=>ProfileModule
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
