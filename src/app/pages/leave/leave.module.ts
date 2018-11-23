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


const buttons = [
  { name: 'edit', button: { text: 'Izmeni', icon: 'pencil-square-o' } },
  { name: 'delete', button: { text: 'Obriši', icon: 'trash-o' } },
  { name: 'view', button: { text: 'Detalji', icon: 'address-card-o' } },
  { name: 'save', button: { text: 'Sačuvaj', icon: 'floppy-o' } },
  { name: 'approve', button: { text: 'Odobri', icon: 'check' } },
  { name: 'deny', button: { text: 'Poništi', icon: 'ban' } },
  { name: 'generate', button: { text: 'Generiši dokument', icon: 'file-text' } },
  { name: 'remove', button: { text: 'Obriši', icon: 'trash-o' } }
];

@NgModule({
  imports: [
    TimsystemsLibModule,
    HotTableModule,
    TimsGridModule.setConfig({
      buttons: buttons
    }),
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LeaveComponent, LeaveFormComponent, AbscencesListComponent, SickAbsenceFormComponent, PaidAbsenceFormComponent, WorksheetsFormComponent, DialogOverviewWorksheets, DialogDenyMessage],
  exports: [LeaveComponent, LeaveFormComponent, AbscencesListComponent],
  entryComponents: [DialogOverviewWorksheets, DialogDenyMessage]
})
export class LeaveModule { }
