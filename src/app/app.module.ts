import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimsystemsLibModule } from 'timsystems-lib';
import { LeaveModule } from './pages/leave/leave.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LeaveModule, TimsystemsLibModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
