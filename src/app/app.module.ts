import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveModule } from './pages/leave/leave.module';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from "@angular/material";

import { DialogOverviewWorksheets } from 'src/app/pages/leave/worksheets-form/worksheets-form.component';

@NgModule({
  declarations: [AppComponent, DialogOverviewWorksheets],
  imports: [BrowserModule, AppRoutingModule, LeaveModule, MatButtonModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents: [DialogOverviewWorksheets]
})
export class AppModule {}
