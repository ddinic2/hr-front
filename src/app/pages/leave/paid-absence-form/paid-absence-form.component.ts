import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceSubtype } from 'src/app/models/absence-subtype';
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { LoginService } from 'src/app/shared/shared/login.service';
import {MatSnackBar} from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'hr-paid-absence-form',
  templateUrl: './paid-absence-form.component.html',
  styleUrls: ['./paid-absence-form.component.scss']
})
export class PaidAbsenceFormComponent implements OnInit {
  
  public retPostData;
  employeePaidAbsenceForm: FormGroup;
  loggedUser: any;
  absenceType = AbsenceTypes.PaidAbsence;
  absenceTypeName = 'Plaćena odsustva';
  absenceProcessStatus = AbsenceProcessStatus.Created;
  absenceSubtypeOptions: AbsenceSubtype[] = [];
  employeeOptions: Employee[] = [];
  holidayDays: any;

  @Output() abscenceSaved = new EventEmitter();


  disableWeekdays = (d: Date): boolean => {
    const day = d.getDay();
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
    return day !== 0 && day !== 6 && !holidayDays.includes(date);
  }
  
  constructor(private _fromBuilder: FormBuilder, public subsService: SubstituteService, public loginService: LoginService, public snackBar: MatSnackBar) {
    this.employeePaidAbsenceForm = this._fromBuilder.group ({
      fromDate: [''],
      toDate: [''],
      absenceSubtype: [''],
      employeeAbsenceDetail:[''],
      employeeAbsence:[''],
      employeeId:['']
    });
    
   }

  ngOnInit() {
    this.subsService.getAbsenceSubtype().subscribe (res => {this.absenceSubtypeOptions = res});
    this.loggedUser =  this.loginService.getLoggedInUser();
    this.subsService.getEmployee().subscribe(res => {this.employeeOptions = res});
    this.subsService.getHolidayDaysForCalendar().subscribe(res => {
      this.holidayDays = res;        
  });

  this.employeePaidAbsenceForm.controls['fromDate'].valueChanges.subscribe(value => {
    const employee = this.employeePaidAbsenceForm.controls['employeeAbsenceDetail'].value;
    if (value && this.employeePaidAbsenceForm.controls['toDate'].value && employee) {
      this.subsService.getSubstitutesByDate(this.employeePaidAbsenceForm.controls['toDate'].value, value, employee.EmployeeId, this.absenceType).subscribe((result) => {
        if(result == null)
        {
          this.snackBar.open('Postoji odsustvo za ovaj vremenski period!', 'OK', {
            duration: 10000,
            verticalPosition: 'top'
          });
          this.employeePaidAbsenceForm.controls['fromDate'].reset();
          this.employeePaidAbsenceForm.controls['toDate'].reset();
        }
        
      });
    }
  });

    
    this.employeePaidAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      const employee = this.employeePaidAbsenceForm.controls['employeeAbsenceDetail'].value;
      if (value && this.employeePaidAbsenceForm.controls['fromDate'].value && employee) {
        this.subsService.getSubstitutesByDate(this.employeePaidAbsenceForm.controls['fromDate'].value, value, employee.EmployeeId, this.absenceType).subscribe((result) => {
          if(result == null)
          {
            this.snackBar.open('Postoji odsustvo za ovaj vremenski period!', 'OK', {
              duration: 10000,
              verticalPosition: 'top'
            });
            this.employeePaidAbsenceForm.controls['fromDate'].reset();
            this.employeePaidAbsenceForm.controls['toDate'].reset();
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
    const formResult: EmployeeAbsence = this.employeePaidAbsenceForm.value;
    formResult.loggedUserId = this.loggedUser.value.data.employeeId;
    formResult.loggedUserEmail =  this.loggedUser.value.data.employeeEmail;
    formResult.absenceType = this.absenceType;
    formResult.absenceTypeName = this.absenceTypeName;
    formResult.absenceProcessStatus = this.absenceProcessStatus; 
    
    this.subsService.postAbsence(formResult).subscribe(res => {
      this.retPostData = res;
      this.snackBar.open(this.retPostData, 'OK', {
      duration: 10000,
      verticalPosition: 'top'
    });
    this.employeePaidAbsenceForm.reset();
    this.employeePaidAbsenceForm.enable();
    this.abscenceSaved.next(true);
  });  
  console.log(JSON.stringify(formResult, null, 2));   
  }

  editPaidAbsence = (event) => {
    this.employeePaidAbsenceForm.controls['employeeAbsenceDetail'].setValue(event.EmployeeName);
    this.employeePaidAbsenceForm.controls['fromDate'].setValue(event.FromDate);
    this.employeePaidAbsenceForm.controls['toDate'].setValue(event.ToDate);
    this.employeePaidAbsenceForm.controls['absenceSubtype'].setValue(event.AbsenceSubtype);
    this.employeePaidAbsenceForm.controls['employeeAbsence'].setValue(event.EmployeeAbsence);
    this.employeePaidAbsenceForm.controls['employeeId'].setValue(event.EmployeeId);
    this.employeePaidAbsenceForm.controls['employeeAbsenceDetail'].disable();
    
  }

  cancelAbsence = () => {
    this.employeePaidAbsenceForm.reset();
    this.employeePaidAbsenceForm.enable();
  }

}
