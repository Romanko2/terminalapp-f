import { Component, Input, OnInit } from '@angular/core';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input'; 

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnInit {
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  @Input() control:any
  constructor() { }

  ngOnInit(): void {
  }
}
