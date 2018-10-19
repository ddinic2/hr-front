import { AbscenceService } from './../abscence.service';
import { Component, OnInit } from '@angular/core';
import { LeaveComponent }  from 'src/app/pages/leave/leave.component';
import { MatTabChangeEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'hr-abscences-list',
  templateUrl: './abscences-list.component.html',
  styleUrls: ['./abscences-list.component.scss'],
})
export class AbscencesListComponent implements OnInit {
  pipesToApply = [];
  //absenceType = new  BehaviorSubject(1);
  columnNameArray = [
    'Ime',
    'Datum od',
    'Datum do',
    'Broj radnih dana',
    'HRJobTypePosition',
    'HRProcesStatus',
    'HREmployeeAbsence',
  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfdays',
    'JobTypePosition',
    'ProcesStatus',
    'EmployeeAbsence'
  ];

  constructor(private service: AbscenceService) {}

  ngOnInit() {}
 

  getRepoIssues = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number,
    absenceType: number
    
  ) =>
    this.service.getAbscences(
      order,
      direction,
      page,
      count,
      status,
      absenceType
    );


  edit = () => console.log('edit');
  save = () => console.log('save');
  view = () => console.log('view');
  approve = () => console.log('approve');
  deny = () => console.log('deny');
}
