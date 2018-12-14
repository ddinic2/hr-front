import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { AbscenceService } from '../../absence-overview/abscence.service';
import { Roles } from 'src/app/models/enums/role';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'hr-sick-absence-form',
  templateUrl: './sick-absence-form.component.html',
  styleUrls: ['./sick-absence-form.component.scss']
})
export class SickAbsenceFormComponent implements OnInit {
  @ViewChild(TimsGridComponent) grid: TimsGridComponent;
  pipesToApply = [];


  public retPostData;
  employeeSickAbsenceForm: FormGroup;
  // filteredSickLeaveTypeOptions: Observable<AbsenceSickLeaveType[]>;
  sickLeaveTypeOptions: AbsenceSickLeaveType[] = [];
  absenceSubtypeOptions: AbsenceSubtype[] = [];
  sickLeaveCodeOptions: SickLeaveCode[] = [];
  employeeOptions: Employee[] = [];
  filterOptions: Employee[] = [];
  loggedUser: any;
  absenceType = AbsenceTypes.SickAbsence;
  absenceTypeName = 'Bolovanje';
  absenceProcessStatus = AbsenceProcessStatus.Created;
  holidayDays: any;
  loggedEmployeeId: string;
  roleId: string;

  columnNameArray = [
    'Ime i Prezime',
    'Datum od',
    'Datum do',
    'Broj radnih dana',
    'Status odsustva'
  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfDays',
    'AbsenceProcessStatusName'
  ];

  //@Output() abscenceSaved = new EventEmitter();

  disableWeekdays = (d: Date): boolean => {
    const dayIndex = d.getDay();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = d.getDate();
    const holidayDays = new Array();
    this.holidayDays.filter(function(days) {
      if ( days.Month === month && days.Year === year) {
        holidayDays.push(days.DateOfHoliday);
      }
    });
    return dayIndex !== 0 && dayIndex !== 6 && !holidayDays.includes(date);
  }

  constructor(private _formBuilder: FormBuilder, public loginService: LoginService, public snackBar: MatSnackBar,
    public absenceService: AbscenceService, public subsService: SubstituteService) {
    this.employeeSickAbsenceForm = this._formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      sickLeaveType: ['', Validators.required],
      absenceSubtype: ['', Validators.required],
      sickLeaveCode: ['', Validators.required],
      employeeAbsenceDetail: [''],
      employeeAbsence: [''],
      employeeId: ['']

    });
  }

  ngOnInit() {
    this.subsService.getAbsenceSickLeaveType().subscribe(res => { this.sickLeaveTypeOptions = res; });
    this.subsService.getAbsenceSubtype(this.absenceType).subscribe(res => {this.absenceSubtypeOptions = res; });
    this.subsService.getSickLeaveCode().subscribe(res => {this.sickLeaveCodeOptions = res; });
    this.loggedUser =  this.loginService.getLoggedInUser();
    this.loggedEmployeeId = this.loggedUser.value.data.employeeId;
    this.roleId = this.loggedUser.value.data.roleId;
    this.subsService.getEmployee().subscribe(res => {
      this.employeeOptions = res;
      this.filterOptions = res;
     });
    this.subsService.getHolidayDaysForCalendar().subscribe(res => {
      this.holidayDays = res;
  });

  this.employeeSickAbsenceForm.controls['fromDate'].valueChanges.subscribe(value => {
    const employee = this.employeeSickAbsenceForm.controls['employeeAbsenceDetail'].value;
    if (value && this.employeeSickAbsenceForm.controls['toDate'].value && employee) {
      this.subsService.getSubstitutesByDate(this.employeeSickAbsenceForm.controls['toDate'].value,
       value, employee.EmployeeId, this.absenceType)
      .subscribe((result) => {
        if (result == null) {
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

    this.employeeSickAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      const employee = this.employeeSickAbsenceForm.controls['employeeAbsenceDetail'].value;
      if (value && this.employeeSickAbsenceForm.controls['fromDate'].value && employee) {
  this.subsService.getSubstitutesByDate(this.employeeSickAbsenceForm.controls['fromDate'].value,
   value, employee.EmployeeId, this.absenceType)
        .subscribe((result) => {
          if (result == null) {
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

      this.employeeSickAbsenceForm.controls['employeeAbsenceDetail'].valueChanges.subscribe(value => {
        if (value !== null && typeof value === 'string') {
          this.filterOptions = this._filter(value.trim());
        } else {
        this.filterOptions = this.employeeOptions;
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
  ) => {
    return this.absenceService.getAbscences(order, direction, page, count, status, absenceType, this.loggedEmployeeId, this.roleId);
  }

  private _filter(name: string): any[] {
    if (this.employeeOptions !== undefined) {
      this.employeeOptions = this.employeeOptions;
      return this.employeeOptions.filter(
        (option: any) =>
          option.FirstName.toLowerCase().indexOf(name.toLowerCase()) === 0
      );
    }
  }


  displayFn(employee: any): string | undefined {
    if (employee != null) {
        //return typeof (option) === 'string' ? option : `${option.FirstName ? option.FirstName : 'nema ime'} ${option.Surname ? option.Surname : 'nema prezime'}`;
        return typeof (employee) === 'string' ? employee : `${employee.FirstName} ${employee.Surname} ${employee.JobTypeName}`;
    }

  }

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeeSickAbsenceForm.value;
    formResult.loggedEmployeeId = this.loggedUser.value.data.employeeId;
    formResult.loggedUserId = this.loggedUser.value.data.userId;
    formResult.loggedUserEmail =  this.loggedUser.value.data.employeeEmail;
    formResult.absenceType = this.absenceType;
    formResult.absenceTypeName = this.absenceTypeName;
    formResult.absenceProcessStatus = this.absenceProcessStatus;
    this.subsService.postAbsence(formResult).subscribe(res => {
      this.retPostData = res;
      this.snackBar.open(this.retPostData, 'OK', {
      duration: 5000,
      verticalPosition: 'top'
    });
    this.employeeSickAbsenceForm.reset();
    this.employeeSickAbsenceForm.enable();
    this.filterOptions = this.employeeOptions;
    //this.abscenceSaved.emit(null);
    //this.abscenceSaved.next(true);
    this.grid.refresh();
  });
  console.log(JSON.stringify(formResult, null, 2));
  }



  cancelAbsence = () => {
    this.employeeSickAbsenceForm.reset();
    this.employeeSickAbsenceForm.enable();
    this.filterOptions = this.employeeOptions;
  }

  edit = event => {
    if (this.roleId === Roles.HRManager.toString()) {
      this.employeeSickAbsenceForm.controls['employeeAbsenceDetail'].setValue(event.EmployeeName);
    this.employeeSickAbsenceForm.controls['fromDate'].setValue(event.FromDate);
    this.employeeSickAbsenceForm.controls['toDate'].setValue(event.ToDate);
    this.employeeSickAbsenceForm.controls['absenceSubtype'].setValue(event.AbsenceSubtype);
    this.employeeSickAbsenceForm.controls['sickLeaveType'].setValue(event.SickLeaveType);
    this.employeeSickAbsenceForm.controls['sickLeaveCode'].setValue(event.SickLeaveCode);
    this.employeeSickAbsenceForm.controls['employeeAbsence'].setValue(event.EmployeeAbsence);
    this.employeeSickAbsenceForm.controls['employeeId'].setValue(event.EmployeeId);
    this.employeeSickAbsenceForm.controls['employeeAbsenceDetail'].disable();

    } else {
      this.snackBar.open('Bolovanje ne možete da editujete!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });
    }

  }


  remove = item => {
    if (this.roleId === Roles.HRManager.toString()) {
      const absenceId = item.EmployeeAbsence;
    this.absenceService.removeAbsence(absenceId).subscribe(res => {
      this.retPostData = res;
       this.snackBar.open(this.retPostData, 'OK', {
       duration: 10000,
       verticalPosition: 'top'
       });
       this.grid.refresh();
      }
    );

    } else {
      this.snackBar.open('Bolovanje ne možete da obrišete!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });
    }

  }

}
