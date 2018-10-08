import { AbscenceService } from './../abscence.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hr-abscences-list',
  templateUrl: './abscences-list.component.html',
  styleUrls: ['./abscences-list.component.scss']
})
export class AbscencesListComponent implements OnInit {
  pipesToApply = [];
  columnNameArray = [
    'Ime',
    'Datum od',
    'Datum do',
    'Nesto',
    'HRJobTypePosition',
    'HRProcesStatus',
    'HREmployeeAbsence'
  ];

  displayedColumns = [
    'EmployeeName',
    'DateFrom',
    'DateTo',
    'HRAbsenceTypeName',
    'HRJobTypePosition',
    'HRProcesStatus',
    'HREmployeeAbsence'
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

  
}
