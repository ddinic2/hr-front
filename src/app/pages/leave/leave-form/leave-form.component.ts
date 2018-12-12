import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubstituteService } from '../substitute.service';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { Employee } from 'src/app/models/employee';
import { LoginService } from 'src/app/shared/shared/login.service';
import { AbsenceTypes } from 'src/app/models/enums/absence-type';
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimsGridComponent } from 'timsystems-lib';
import { AbscenceService } from 'src/app/pages/absence-overview/abscence.service';
import { Roles } from 'src/app/models/enums/role';


@Component({
  selector: 'hr-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
 @ViewChild(TimsGridComponent) grid: TimsGridComponent;

  @Output() abscenceSaved = new EventEmitter<any>();
  public retPostData;
  employeeAbsenceForm: FormGroup;
  filteredSubEmployeeOptions: Observable<Employee[]>;
  options: Employee[] = [];
  filteredOptions: Employee[] = [];
  holidayDays: any;
  isDisabled = false;
  loggedUser: any;
  absenceType = AbsenceTypes.Absence;
  absenceTypeName = 'Godišnji odmor';
  absenceProcessStatus = AbsenceProcessStatus.Created;
  employeeFamilyDay: any;
  employeeFamilyHoliday: any;
  showTable: boolean;
  loggedId: string;
  roleId: string;
  pipesToApply = [];
  rolaHRManager = Roles.HRManager.toString();
  rolaManager = Roles.Manager.toString();
  yearVacation: any;
  minDate = new Date();
  exceptionAbsence: boolean;



  columnNameArray = [
    'Ime i Prezime',
    'Datum od',
    'Datum do',
    'Broj radnih dana',
    'Izuzetak',
    'Status odsustva'
  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfDays',
    'ExceptionAbsenceName',
    'AbsenceProcessStatusName'
  ];


  disableWeekdays = (d: Date): boolean => {
    const day = d.getDay();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = d.getDate();
    const holidayDays = new Array();
    this.holidayDays.filter(function(days) {
      if ( days.Month === month && days.Year === year) {
        holidayDays.push(days.DateOfHoliday);
      }
    });
    if (this.employeeFamilyDay.FamilyHolidayMonth && this.employeeFamilyDay.FamilyHolidayMonth === month) {
      return day !== 0 && day !== 6 && !holidayDays.includes(date) && date !== this.employeeFamilyDay.FamilyHolidayDay;
    } else {
      return day !== 0 && day !== 6 && !holidayDays.includes(date);
    }

  }


  constructor(private _formBuilder: FormBuilder, public subsService: SubstituteService,
    public loginService: LoginService, public snackBar: MatSnackBar, public absenceService: AbscenceService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.showTable = true;

    this.employeeAbsenceForm = this._formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      replaceEmployee: ['', Validators.required],
      remainingDays: [{value: '', disabled: true}],
      remainingDaysPreviousYear: [{value: '', disabled: true}],
      totalDays: [{value: '', disabled: true}]

    });


    this.loggedUser =  this.loginService.getLoggedInUser();
    this.loggedId = this.loggedUser.value.data.employeeId;
    this.roleId = this.loggedUser.value.data.roleId;
    this.subsService.getHolidayDaysForCalendar().subscribe(res => {
        this.holidayDays = res;
    });
    this.absenceService.getYearVacation(this.loggedId).subscribe(res => {
      this.yearVacation = res;
      this.employeeAbsenceForm.controls['remainingDays'].setValue(this.yearVacation.RemainingDays);
      this.employeeAbsenceForm.controls['remainingDaysPreviousYear'].setValue(this.yearVacation.RemainingDaysPreviousYear);
      this.employeeAbsenceForm.controls['totalDays'].setValue(this.yearVacation.TotalDays);

    });


    this.subsService.getEmployeeFamilyHoliday(this.loggedUser.value.data.employeeId).subscribe(res => {
      this.employeeFamilyHoliday = res;
      this.employeeFamilyDay = res;
  });


    this.employeeAbsenceForm.controls['fromDate'].valueChanges.subscribe(value => {
      if (value && this.employeeAbsenceForm.controls['toDate'].value) {
        this.subsService.getSubstitutesByDate(this.employeeAbsenceForm.controls['toDate'].value, value,
         this.loggedUser.value.data.employeeId, this.absenceType)
        .subscribe((result) => {
          if (result == null) {
            this.snackBar.open('Postoji odsustvo za ovaj vremenski period', 'OK', {
              duration: 10000,
              verticalPosition: 'top'
            });
            this.employeeAbsenceForm.controls['fromDate'].reset();
            this.employeeAbsenceForm.controls['toDate'].reset();
          }

          this.options = result;
          this.filteredOptions = result;
        });
      }
    });

    this.employeeAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      if (value && this.employeeAbsenceForm.controls['fromDate'].value) {
        this.subsService.getSubstitutesByDate(this.employeeAbsenceForm.controls['fromDate'].value, value,
         this.loggedUser.value.data.employeeId, this.absenceType)
        .subscribe((result) => {
          if (result == null) {
            this.snackBar.open('Postoji odsustvo za ovaj vremenski period', 'OK', {
              duration: 10000,
              verticalPosition: 'top'
            });
            this.employeeAbsenceForm.controls['fromDate'].reset();
            this.employeeAbsenceForm.controls['toDate'].reset();
          }

          this.options = result;
          this.filteredOptions = result;
        });
      }
    });

    this.employeeAbsenceForm.controls['replaceEmployee'].valueChanges.subscribe(value => {
      if (value !== null && typeof value === 'string') {
        this.filteredOptions = this._filter(value.trim());
      } else {
      this.filteredOptions = this.options;
      }
    });



    }

    detailsEmployeeAbsence = (
      order: string,
      direction: string,
      page = 1,
      count = 20,
      status: number,
      absenceType: number = this.absenceType
    ) => this.absenceService.getAbscences(order, direction, page, count, status, absenceType, this.loggedId, this.roleId)

  private _filter(name: string): any[] {
    if (this.options !== undefined) {
      this.options = this.options;
      return this.options.filter(
        (option: any) =>
          option.FirstName.toLowerCase().indexOf(name.toLowerCase()) === 0
      );
    }
  }

  displayFn(employee: any): string | undefined {
    if (employee != null) {
        return typeof (employee) === 'string' ? employee : `${employee.FirstName} ${employee.Surname} ${employee.JobTypeName}`;
    }

  }

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeeAbsenceForm.value;
    formResult.loggedUserId = this.loggedUser.value.data.employeeId;
    formResult.loggedUserEmail =  this.loggedUser.value.data.employeeEmail;
    formResult.absenceType = this.absenceType;
    formResult.absenceTypeName = this.absenceTypeName;
    formResult.absenceProcessStatus = this.absenceProcessStatus;
    formResult.familyHolidayDay = this.employeeFamilyHoliday.FamilyHolidayDay;
    formResult.familyHolidayMonth = this.employeeFamilyHoliday.FamilyHolidayMonth;
    formResult.root = window.location.href;

    this.exceptionAbsence  = this.subsService.checkAbsenceException(this.employeeAbsenceForm.controls['toDate'].value);
    if (this.exceptionAbsence) {
      const dialogRef = this.dialog.open(DialogLeaveForm, {
        width: '350px',
        height: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          formResult.description = result.value.description;
          this.subsService.postAbsence(formResult).subscribe(res => {
            this.retPostData = res;
             this.snackBar.open(this.retPostData, 'OK', {
             duration: 10000,
             verticalPosition: 'top'
           });
           this.employeeAbsenceForm.controls['fromDate'].reset();
           this.employeeAbsenceForm.controls['toDate'].reset();
           this.employeeAbsenceForm.controls['replaceEmployee'].reset();
           if (this.roleId === Roles.HRManager.toString() || this.roleId === Roles.Manager.toString()) {
            this.abscenceSaved.next(true);
           } else {
            this.grid.refresh();
           }

         });
        }
      });
    } else {
      this.subsService.postAbsence(formResult).subscribe(res => {
        this.retPostData = res;
         this.snackBar.open(this.retPostData, 'OK', {
         duration: 10000,
         verticalPosition: 'top'
       });
      // this.employeeAbsenceForm.reset();
       this.employeeAbsenceForm.controls['fromDate'].reset();
       this.employeeAbsenceForm.controls['toDate'].reset();
       this.employeeAbsenceForm.controls['replaceEmployee'].reset();
       if (this.roleId === Roles.HRManager.toString() || this.roleId === Roles.Manager.toString()) {
        this.abscenceSaved.next(true);
       } else {
        this.grid.refresh();
       }
     });

    }

    console.log(JSON.stringify(formResult, null, 2));
  }

  cancelAbsence = () => {
    this.employeeAbsenceForm.controls['fromDate'].reset();
      this.employeeAbsenceForm.controls['toDate'].reset();
      this.employeeAbsenceForm.controls['replaceEmployee'].reset();
      this.employeeAbsenceForm.enable();
  }

}

@Component({
  selector: 'hr-dialog-leave-form',
  templateUrl: 'dialog-leave-form.html',
})
export class DialogLeaveForm {
  dialogFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogLeaveForm>) {
      this.dialogFormGroup = this._formBuilder.group({
        description: [''],
        deny: ['']
      });
     }

  onClick = (data) => {
    this.dialogFormGroup.controls['deny'].setValue(data);
    this.dialogRef.close(this.dialogFormGroup);
  }

}







