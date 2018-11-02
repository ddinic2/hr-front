import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveModule } from './pages/leave/leave.module';
import {MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LeaveModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
