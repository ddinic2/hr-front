import { AbscenceService } from './../abscence.service';
import { Component, OnInit } from '@angular/core';
import { LeaveComponent }  from 'src/app/pages/leave/leave.component';


@Component({
  selector: 'hr-abscences-list',
  templateUrl: './abscences-list.component.html',
  styleUrls: ['./abscences-list.component.scss'],
})
export class AbscencesListComponent implements OnInit {
  pipesToApply = [];
  absenceList: any = [];
    
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


//Odobravanje odsustva
  edit = (item) => {
    this.service.changeAbsenceStatus(item.EmployeeAbsence, item.AbsenceProcessStatus = 2);
  }; 
  //Ponistavanje odsustva
  save =  (item) => {
    this.service.changeAbsenceStatus(item.EmployeeAbsence, item.AbsenceProcessStatus = 3);
  };
  view = (item) =>
  console.log('view');

    
}
