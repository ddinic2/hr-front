import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveModule } from './pages/leave/leave.module';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule, MatFormFieldModule} from "@angular/material";
import {  ReactiveFormsModule } from '@angular/forms';
import { DialogOverviewWorksheets } from 'src/app/pages/leave/worksheets-form/worksheets-form.component';
import { DialogDenyMessage } from 'src/app/pages/absence-overview/abscences-list/abscences-list.component';



@NgModule({
  declarations: [AppComponent, DialogOverviewWorksheets, DialogDenyMessage],
  imports: [BrowserModule, AppRoutingModule, LeaveModule, MatButtonModule, MatDialogModule, MatFormFieldModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents: [DialogOverviewWorksheets, DialogDenyMessage]
})
export class AppModule {}
