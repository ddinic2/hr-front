import { LeaveFormComponent } from './pages/leave/leave-form/leave-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AbscencesListComponent } from './pages/absence-overview/abscences-list/abscences-list.component';

const routes: Routes = [
  { path: 'lista-odsustava', component: AbscencesListComponent },
  {
    path: 'odsustvo',
    component: LeaveFormComponent,
    data: { title: 'Odsustvo' }
  },
  { path: '**', component: AbscencesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
