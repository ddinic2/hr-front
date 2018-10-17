import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbscencesListComponent } from './pages/absence-overview/abscences-list/abscences-list.component';
import { LeaveComponent } from './pages/leave/leave.component';

const routes: Routes = [
  { path: 'lista-odsustava', component: AbscencesListComponent },
  {
    path: 'odsustvo',
    component: LeaveComponent,
    data: { title: 'Odsustvo' }
  },
  { path: '**', component: AbscencesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
