import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AbscencesListComponent } from '../absence-overview/abscences-list/abscences-list.component';
import { LeaveFormComponent } from './leave-form/leave-form.component';
import { LeaveComponent } from './leave.component';
import { SickAbsenceFormComponent } from './sick-absence-form/sick-absence-form.component';
import { PaidAbsenceFormComponent } from './paid-absence-form/paid-absence-form.component';
import { WorksheetsFormComponent } from './worksheets-form/worksheets-form.component';

import { TimsystemsLibModule, TimsGridModule } from 'timsystems-lib';


const buttons = new Map([
  ['edit', { text: 'Izmeni', icon: 'pencil-square-o' }],
  ['delete', { text: 'Obriši', icon: 'trash-o' }],
  ['view', { text: 'Detalji', icon: 'address-card-o' }],
  ['save', { text: 'Sačuvaj', icon: 'floppy-o' }],
  ['approve', { text: 'Odobri', icon: 'check' }],
  ['deny', { text: 'Odbij', icon: 'ban' }],
  ['generate', { text: 'Generiši dokument', icon: 'file-text' }],
]);

@NgModule({
  imports: [
    TimsystemsLibModule,
    TimsGridModule.setConfig({
      buttons: buttons,
    }),
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [LeaveComponent, LeaveFormComponent, AbscencesListComponent, SickAbsenceFormComponent, PaidAbsenceFormComponent, WorksheetsFormComponent],
  exports: [LeaveComponent, LeaveFormComponent, AbscencesListComponent]
})
export class LeaveModule {}
