import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveModule } from './pages/leave/leave.module';
import {MatButtonModule, DateAdapter,
   // tslint:disable-next-line:max-line-length
   MatAutocompleteModule, MatTableModule, MatTooltipModule, MatIconModule, MatGridListModule, MatToolbarModule, MatSidenavModule, MatListModule, MatExpansionModule, MatCardModule, MatCheckboxModule, MatPaginatorModule } from '@angular/material';
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
import { MultiDatepickerModule } from './pages/motiv8/multidatepicker/multidatepicker.module';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuListItemComponent } from './pages/menu-list-item/menu-list-item.component';
import { NavService } from './pages/nav.service';
import {MatStepperModule} from '@angular/material/stepper';
import { EmployeeProfilComponent } from './pages/employee-profil/employee-profil.component';
import { GridComponent } from './pages/grid/grid.component';
import { TaskManagerComponent } from './pages/task-manager/task-manager.component';
import {A11yModule} from '@angular/cdk/a11y';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, Motiv8Component,
    InfoCardComponent, WhatRequestComponent, WhatHalfComponent, WhatYearlyComponent,
    HowComponent, TotalYearlyComponent, MatStarRatingComponent, LogInComponent, HomeComponent, MenuListItemComponent,
     EmployeeProfilComponent,
     GridComponent,
     TaskManagerComponent],  //
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, MultiDatepickerModule, FormsModule, TimsGridModule, MatTableModule, AppRoutingModule ,
    MatGridListModule, LeaveModule, MatAutocompleteModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule ,
    ReactiveFormsModule, MatTabsModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatSnackBarModule,
    HttpClientModule, MatTooltipModule, MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule,
    MatListModule, MatStepperModule, MatExpansionModule, MatCardModule, MatCheckboxModule, MatPaginatorModule,
    A11yModule, CdkTableModule, CdkTreeModule, DragDropModule, ScrollingModule],
  providers: [ NavService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
dateAdapter.setLocale('en-in'); // DD/MM/YYYY
}
}


