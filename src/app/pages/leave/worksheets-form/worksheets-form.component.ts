import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { Employee} from 'src/app/models/employee';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AbsenceType } from 'src/app/models/absence-type';
import { LoginService } from 'src/app/shared/shared/login.service';
import { Worksheets} from 'src/app/models/worksheets';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'hr-worksheets-form',
  templateUrl: './worksheets-form.component.html',
  styleUrls: ['./worksheets-form.component.scss']
})
export class WorksheetsFormComponent implements OnInit {
  worksheetsForm: FormGroup;
  orgUnitOptions: any;
  worksheetsMonthsOptions: number[] = [];
  worksheetsYearsOptions: number[] = [];
  displayedColumns: string[] = [];
  dateArray: number[] = [31];
  dateList:number[]= [];
  absenceTypeOptions: AbsenceType[] = [];
  presenceDetailTypeOptions: any;
  loggedUser: any;
  employeePresenceList: any;
  selectedValue: string;
  worksheetsBehaviorSub = new BehaviorSubject<Worksheets>(null);

  

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  

  constructor(private _fromBuilder: FormBuilder, public subService: SubstituteService, public loginService: LoginService) {
    this.worksheetsForm = this._fromBuilder.group({
      orgUnit: [''],
      year: [''],
      month: [''],
      absenceTypeControl: [''] ,
      empName:[''],
      firstName:['']

    });
   
   }

  ngOnInit() {
    this.loggedUser =  this.loginService.getLoggedInUser();
    this.subService.getOrgUnit().subscribe(res => {this.orgUnitOptions = res});
    this.subService.getWorksheetsYears().subscribe (res=> {this.worksheetsYearsOptions = res});
    this.subService.getWorksheetsMonths().subscribe (res=> {this.worksheetsMonthsOptions = res});
    this.subService.getAbsenceType().subscribe (res => {this.absenceTypeOptions = res})
    this.subService.getPresenceDetailType().subscribe(res => {this.presenceDetailTypeOptions = res});
    this.dateList =  this.dateArrayListDetails(this.dateArray);   
    this.worksheetsForm.get('month').setValue(1);
    this.worksheetsForm.get('year').setValue(2018);
    
  }

  displayFn(orgUnit: any): string | undefined {
    return typeof (orgUnit) === 'string' ? orgUnit : `${orgUnit.Name}`;
  }

  displayFn1(orgUnit: any): string | undefined {
    return typeof (orgUnit) === 'string' ? orgUnit : `${orgUnit.Name}`;
  }

 
  dateArrayListDetails = function (dateArray)
  {
    for(var i = 1; i <= dateArray; i++) { 
     this.dateList.push(i);
    };
    this.displayedColumns = this.dateList;
    return this.dateList;
  }

  detailsPresence() {
    const formResult = this.worksheetsForm.value;
    this.subService.getEmployeePresenceList(formResult, this.loggedUser.value.data.employeeId)
    .subscribe(res => { this.employeePresenceList = res });
    //this.selectedValue = this.employeePresenceList[0].Day2Status;
    //console.log("Prikazi listu" + this.employeePresenceList);
    //console.log('Datum prikazi: ' + this.selectedValue);

  }

  setItem = (item,index,event) => {
    console.log(item);
    console.log(event);
    item.DayStatus[index] = event.value;
    console.log(item);
  }

  saveWorksheets = () => {
    const formResult: Worksheets = this.worksheetsForm.value;
    formResult.employeeId = this.loggedUser.value.data.employeeId;
    console.log(this.employeePresenceList);

  }

  // onChange(event: any){
  //   this.worksheetsBehaviorSub.next(this.worksheetsForm.value)
  //   let value = event.target;
  //     }

      
  
}
