import { AbscenceService } from './../abscence.service';
import { Component, OnInit, Input } from '@angular/core';
import { AbsenceProcessStatus } from "src/app/models/enums/absence-process-satatus";
import { LoginService } from 'src/app/shared/shared/login.service';



@Component({
  selector: 'hr-abscences-list',
  templateUrl: './abscences-list.component.html',
  styleUrls: ['./abscences-list.component.scss'],
})
export class AbscencesListComponent implements OnInit {
  pipesToApply = [];  
  data: any 
  absenceProcessStatus = AbsenceProcessStatus;
  loggedUser: any;
   
  @Input() absenceType: number;
  @Input() absProcessStatus: number;
    
  columnNameArray = [
    'Ime',
    'Datum od',
    'Datum do',
    'Broj radnih dana',
    //'HRJobTypePosition',
    'Status odsustva',
    'Tip odsustva',
    'HREmployeeAbsence'

  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfdays',
    //'JobTypePosition',
    'AbsenceProcessStatusName',
    'AbsenceTypeName',
    'EmployeeAbsence'
  ];

  constructor(private service: AbscenceService, private loginService: LoginService) {
   
  }
  

  ngOnInit() {    
    this.loggedUser =  this.loginService.getLoggedInUser();
  }  
  
    getRepoIssues = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number = this.absProcessStatus,
    absenceType: number = this.absenceType
    
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
  approve = (item) => {
    this.service.changeAbsenceStatus(item.EmployeeAbsence, item.AbsenceProcessStatus = this.absenceProcessStatus.Approved).subscribe(res=> {
      item.AbsenceProcessStatusName =  res;          
    });
  };
  //Ponistavanje odsustva
  deny = (item) => {
    this.service.changeAbsenceStatus(item.EmployeeAbsence, item.AbsenceProcessStatus = this.absenceProcessStatus.Deny).subscribe(res => {
      item.AbsenceProcessStatusName = res;
    });
  };
  edit = (item) =>
  console.log('edit');
  save = (item) =>
  console.log('save');
  view = (item) =>
  console.log('view');


}
