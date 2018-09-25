import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbscencesListComponent } from '../absence-overview/abscences-list/abscences-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TimsystemsLibModule } from 'timsystems-lib';
@NgModule({
  imports: [
    TimsystemsLibModule,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LeaveFormComponent, AbscencesListComponent],
  exports: [LeaveFormComponent, AbscencesListComponent]
})
export class LeaveModule {}
