import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AbscencesListComponent } from './pages/absence-overview/abscences-list/abscences-list.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { AuthGuard } from 'src/app/shared/shared/auth.guard';
import { Motiv8Component } from 'src/app/pages/motiv8/motiv8.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeProfilComponent } from './pages/employee-profil/employee-profil.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { title: 'Home' }
  },
  { path: 'lista-odsustava',
   component: AbscencesListComponent,
   canActivate: [AuthGuard]
  },
  { path: 'lista-odsustava/status',
   component: AbscencesListComponent,
   canActivate: [AuthGuard]
  },
  {
    path: 'odsustvo',
    component: LeaveComponent,
    canActivate: [AuthGuard],
    data: { title: 'Odsustvo' }
  },
  {
    path: 'motiv8',
    component: Motiv8Component,
    canActivate: [AuthGuard],
    data: { title: 'Motiv8' }
  },
  {
    path: 'employee-profil/:id',
    component: EmployeeProfilComponent,
    canActivate: [AuthGuard],
    data: { title: 'Employee profil' }
  },
  { path: '**',
    component: LogInComponent,
    canActivate: [AuthGuard]
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


