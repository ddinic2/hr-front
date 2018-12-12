import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveModule } from './pages/leave/leave.module';
import {MatButtonModule, DateAdapter} from '@angular/material';
// tslint:disable-next-line:max-line-length
import {MatDialogModule, MatFormFieldModule, MatTabsModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatSnackBarModule} from "@angular/material";
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Motiv8Component } from './pages/motiv8/motiv8.component';
import { InfoCardComponent } from './pages/motiv8/info-card/info-card.component';
import { WhatRequestComponent } from './pages/motiv8/what-request/what-request.component';
import { WhatHalfComponent } from './pages/motiv8/what-half/what-half.component';
import { WhatYearlyComponent } from './pages/motiv8/what-yearly/what-yearly.component';
import { HttpClientModule , HttpErrorResponse } from '@angular/common/http';
import { HowComponent } from './pages/motiv8/how/how.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, Motiv8Component, InfoCardComponent, WhatRequestComponent, WhatHalfComponent, WhatYearlyComponent, HowComponent],
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, AppRoutingModule, LeaveModule, MatButtonModule, MatDialogModule, MatFormFieldModule , ReactiveFormsModule, MatTabsModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatSnackBarModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
dateAdapter.setLocale('en-in'); // DD/MM/YYYY
}
}


