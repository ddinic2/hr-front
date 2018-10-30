import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';

import { AbscencesListComponent } from './pages/absence-overview/abscences-list/abscences-list.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { AuthGuard } from 'src/app/shared/shared/auth.guard';

const routes: Routes = [
  { path: 'lista-odsustava',
   component: AbscencesListComponent,
   canActivate: [AuthGuard] 
  },
  {
    path: 'odsustvo',
    component: LeaveComponent,
    canActivate: [AuthGuard],
    data: { title: 'Odsustvo' }
  },
  { path: '**', 
    component: AbscencesListComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
