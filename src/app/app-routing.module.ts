import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './feature/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileModule } from './feature/profile/profile.module';
import { AuthGuard } from './shared/auth.guard';
import { LayoutComponent } from './theme/layout/layout.component';
import { FeatureModule } from './feature/feature.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'feature',
    loadChildren: () => FeatureModule,

  },


  {
    path: '**',
    component: NotFoundComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
