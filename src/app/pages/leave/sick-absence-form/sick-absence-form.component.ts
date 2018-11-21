import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceSickLeaveType } from 'src/app/models/absence-sick-leave-type';
import { AbsenceSubtype } from 'src/app/models/absence-subtype';
import { SickLeaveCode } from 'src/app/models/sick-leave-code';
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { LoginService } from 'src/app/shared/shared/login.service';
import {MatSnackBar} from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { TimsGridComponent } from 'timsystems-lib';


@Component({
  selector: 'hr-sick-absence-form',
  templateUrl: './sick-absence-form.component.html',
  styleUrls: ['./sick-absence-form.component.scss']
})
export class SickAbsenceFormComponent implements OnInit {
  @ViewChild(TimsGridComponent) grid: TimsGridComponent;

  abscenceSaved = new EventEmitter<any>();
  public retPostData;
  employeeSickAbsenceForm: FormGroup;
  // filteredSickLeaveTypeOptions: Observable<AbsenceSickLeaveType[]>;
  sickLeaveTypeOptions: AbsenceSickLeaveType[] = [];
  absenceSubtypeOptions: AbsenceSubtype[] = [];
  sickLeaveCodeOptions: SickLeaveCode[] = [];
  employeeOptions: Employee[] = [];
  loggedUser: any;
  absenceType = AbsenceTypes.SickAbsence;
  absenceTypeName = 'Bolovanje';
  absenceProcessStatus = AbsenceProcessStatus.Created;
  holidayDays: any;

  disableWeekdays = (d: Date): boolean => {
    const dayIndex = d.getDay();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = d.getDate();
    const holidayDays = new Array();
    this.holidayDays.filter(function(days){
      if( days.Month == month && days.Year == year)
      {
        holidayDays.push(days.DateOfHoliday);       
      }
    });
    return dayIndex !== 0 && dayIndex !== 6 && !holidayDays.includes(date);
  }
  
  constructor(private _formBuilder: FormBuilder, public subService: SubstituteService, public loginService: LoginService, public snackBar: MatSnackBar, public subsService: SubstituteService) {
    this.employeeSickAbsenceForm = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
      sickLeaveType: [''],
      absenceSubtype:[''],
      sickLeaveCode: [''],
      employeeAbsenceDetail: ['']
      
    });
  }

  ngOnInit() {
    this.subService.getAbsenceSickLeaveType().subscribe(res => { this.sickLeaveTypeOptions = res});
    this.subService.getAbsenceSubtype().subscribe(res => {this.absenceSubtypeOptions = res});
    this.subService.getSickLeaveCode().subscribe(res => {this.sickLeaveCodeOptions = res});
    this.loggedUser =  this.loginService.getLoggedInUser();
    this.subsService.getEmployee().subscribe(res => {this.employeeOptions = res });
    this.subsService.getHolidayDaysForCalendar().subscribe(res => {
      this.holidayDays = res;        
  });

    this.employeeSickAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      const employee = this.employeeSickAbsenceForm.controls['employeeAbsenceDetail'].value;
      if (value && this.employeeSickAbsenceForm.controls['fromDate'].value && employee) {
        this.subService.getSubstitutesByDate(this.employeeSickAbsenceForm.controls['fromDate'].value, value, employee.EmployeeId, this.absenceType).subscribe((result) => {
          if(result == null)
          {
            this.snackBar.open('Postoji odsustvo za ovaj vremenski period!', 'OK', {
              duration: 10000,
              verticalPosition: 'top'
            });
            this.employeeSickAbsenceForm.controls['fromDate'].reset();
            this.employeeSickAbsenceForm.controls['toDate'].reset();
          }
          
        });
      }
    });
  }

  private _filter(name: string): any[] {
    if (this.employeeOptions !== undefined) {
      this.employeeOptions = this.employeeOptions;
      return this.employeeOptions.filter(
        (option: any) =>
          option.FirstName!.toLowerCase().indexOf(name.toLowerCase()) === 0
      );
      // return this.options.filter(
      //   (option: any) =>  option.FullName.includes(name.toLocaleLowerCase())
      // );
    }
  }

  displayFn(employee: any): string | undefined {
    if(employee != null)
    {
        //return typeof (option) === 'string' ? option : `${option.FirstName ? option.FirstName : 'nema ime'} ${option.Surname ? option.Surname : 'nema prezime'}`;
        return typeof (employee) === 'string' ? employee : `${employee.FirstName} ${employee.Surname} ${employee.JobTypeName}`;
    }

  }

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeeSickAbsenceForm.value;
    formResult.loggedUserId = this.loggedUser.value.data.employeeId;
    formResult.loggedUserEmail =  this.loggedUser.value.data.employeeEmail;
    formResult.absenceType = this.absenceType;
    formResult.absenceTypeName = this.absenceTypeName;
    formResult.absenceProcessStatus = this.absenceProcessStatus;  
    this.subService.postAbsence(formResult).subscribe(res => {
      this.retPostData = res;
      this.snackBar.open(this.retPostData, 'OK', {
      duration: 5000,
      verticalPosition: 'top'
    });
    this.employeeSickAbsenceForm.reset();
    //this.abscenceSaved.emit(null);
    this.abscenceSaved.next(true);
  });  
  console.log(JSON.stringify(formResult, null, 2));    
  }

}
