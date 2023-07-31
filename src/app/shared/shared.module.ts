import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TelInputComponent } from './tel-input/tel-input.component';


@NgModule({
  declarations: [
    TelInputComponent
  ],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    GooglePlaceModule
  ],
  exports:[
    TelInputComponent,
    NgxIntlTelInputModule,
    FormsModule, ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    GooglePlaceModule
  ]
})
export class SharedModule { }
