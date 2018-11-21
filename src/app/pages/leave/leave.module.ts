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
import { HotTableModule } from 'ng2-handsontable';
import { DialogOverviewWorksheets } from 'src/app/pages/leave/worksheets-form/worksheets-form.component';
import { DialogDenyMessage } from 'src/app/pages/absence-overview/abscences-list/abscences-list.component';


// const buttons = new Map([
//   ['edit', { text: 'Izmeni', icon: 'pencil-square-o' }],
//   ['delete', { text: 'Obriši', icon: 'trash-o' }],
//   ['view', { text: 'Detalji', icon: 'address-card-o' }],
//   ['save', { text: 'Sačuvaj', icon: 'floppy-o' }],
//   ['approve', { text: 'Odobri', icon: 'check' }],
//   ['deny', { text: 'Poništi', icon: 'ban' }],
//   ['generate', { text: 'Generiši dokument', icon: 'file-text' }]
// ]);

@NgModule({
  imports: [
    TimsystemsLibModule,
    HotTableModule,
    TimsGridModule.setConfig({
      //buttons: buttons
      buttons: new Map([
        ['edit', { text: 'Izmeni', icon: 'pencil-square-o' }],
        ['delete', { text: 'Obriši', icon: 'trash-o' }],
        ['view', { text: 'Detalji', icon: 'address-card-o' }],
        ['save', { text: 'Sačuvaj', icon: 'floppy-o' }],
        ['approve', { text: 'Odobri', icon: 'check' }],
        ['deny', { text: 'Poništi', icon: 'ban' }],
        ['generate', { text: 'Generiši dokument', icon: 'file-text' }]
      ])
    }),
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LeaveComponent, LeaveFormComponent, AbscencesListComponent, SickAbsenceFormComponent, PaidAbsenceFormComponent, WorksheetsFormComponent,  DialogOverviewWorksheets, DialogDenyMessage],
  exports: [LeaveComponent, LeaveFormComponent, AbscencesListComponent],
  entryComponents: [DialogOverviewWorksheets, DialogDenyMessage]
})
export class LeaveModule {}
