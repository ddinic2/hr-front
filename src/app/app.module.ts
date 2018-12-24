import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveModule } from './pages/leave/leave.module';
import {MatButtonModule, DateAdapter,
   MatAutocompleteModule, MatTableModule, MatTooltipModule, MatIconModule, MatGridListModule } from '@angular/material';
// tslint:disable-next-line:max-line-length
import {MatDialogModule, MatFormFieldModule, MatTabsModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatSnackBarModule} from '@angular/material';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Motiv8Component } from './pages/motiv8/motiv8.component';
import { InfoCardComponent } from './pages/motiv8/info-card/info-card.component';
import { WhatRequestComponent } from './pages/motiv8/what-request/what-request.component';
import { WhatHalfComponent } from './pages/motiv8/what-half/what-half.component';
import { WhatYearlyComponent } from './pages/motiv8/what-yearly/what-yearly.component';
import { HttpClientModule , HttpErrorResponse } from '@angular/common/http';
import { HowComponent } from './pages/motiv8/how/how.component';
import { TimsGridModule } from 'libs/timsystems-lib';
import { TotalYearlyComponent } from './pages/motiv8/total-yearly/total-yearly.component';
import { MatStarRatingComponent } from './pages/motiv8/how/mat-star-rating/mat-star-rating.component';
import { MultiDatepickerComponent,  } from './pages/motiv8/multidatepicker/multidatepicker.component';
import { YearPickerComponent } from './pages/motiv8/multidatepicker/year-picker-component/year-picker.component';
import { MonthPickerComponent } from './pages/motiv8/multidatepicker/month-picker-component/month-picker.component';
import { RegularDatepickerComponent  } from './pages/motiv8/multidatepicker/regular-datepicker-component/regular-datepicker.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [MonthPickerComponent, RegularDatepickerComponent, AppComponent, MultiDatepickerComponent, Motiv8Component,
    InfoCardComponent, WhatRequestComponent, WhatHalfComponent, WhatYearlyComponent,
    HowComponent, TotalYearlyComponent, MatStarRatingComponent, YearPickerComponent],  //
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, FormsModule, TimsGridModule, MatTableModule, AppRoutingModule , MatGridListModule, LeaveModule, MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule , ReactiveFormsModule, MatTabsModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatSnackBarModule, HttpClientModule, MatTooltipModule, MatButtonModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
dateAdapter.setLocale('en-in'); // DD/MM/YYYY
}
}


