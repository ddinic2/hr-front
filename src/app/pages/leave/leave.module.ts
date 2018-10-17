import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TimsystemsLibModule } from 'timsystems-lib';

import { AbscencesListComponent } from '../absence-overview/abscences-list/abscences-list.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveComponent } from './leave.component';
import { SickAbsenceFormComponent } from './sick-absence-form/sick-absence-form.component';
import { PaidAbsenceFormComponent } from './paid-absence-form/paid-absence-form.component';

@NgModule({
  imports: [
    TimsystemsLibModule,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LeaveComponent, LeaveFormComponent, AbscencesListComponent, SickAbsenceFormComponent, PaidAbsenceFormComponent],
  exports: [LeaveComponent, LeaveFormComponent, AbscencesListComponent]
})
export class LeaveModule {}
