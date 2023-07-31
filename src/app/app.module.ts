import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Material
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


// Compement
import { NotFoundComponent } from './not-found/not-found.component';
// import { HomeComponent } from './feature/home/home.component';


import { BehaviorService } from './shared/behavior.service';
import { ErrorInterceptor } from './shared/error.interceptor';
import { AuthInterceptor } from './shared/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';

import { NgxMaskModule } from 'ngx-mask';
// import { ChartModule } from 'angular-highcharts'; 
// import stock from 'highcharts/modules/stock.src';
// import more from 'highcharts/highcharts-more.src';


export function highchartsModules() {
  // apply Highcharts Modules to this array
  // return [stock, more];
}


@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
  
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),

  ],
  providers: [BehaviorService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
