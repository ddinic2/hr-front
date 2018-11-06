import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubstituteService } from '../substitute.service';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { Employee } from 'src/app/models/employee';
import { LoginService } from 'src/app/shared/shared/login.service';
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';


@Component({
  selector: 'hr-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  employeeAbsenceForm: FormGroup;
  filteredSubEmployeeOptions: Observable<Employee[]>;
  options: Employee[] = [];
  holidayDays: any;
  isDisabled = false;
  loggedUser: any;
  absenceTypes = AbsenceTypes;
  absenceProcessStatus = AbsenceProcessStatus;


  disableWeekdays = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }
  

  constructor(private _formBuilder: FormBuilder, public subsService: SubstituteService, public loginService: LoginService) { 
  }

  ngOnInit() {
    this.employeeAbsenceForm = this._formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      replaceEmployee: [''],
      sickType: ['', Validators.required],
      sickLeaveType: ['', Validators.required],
      absenceType: this.absenceTypes.Absence,
      absenceProcessStatus: this.absenceProcessStatus.Created     
      
    });

    this.loggedUser =  this.loginService.getLoggedInUser();
    
    this.employeeAbsenceForm.controls['fromDate'].valueChanges.subscribe(value => {
      if (value && this.employeeAbsenceForm.controls['toDate'].value) {
        this.subsService.getSubstitutesByDate(value, this.employeeAbsenceForm.controls['toDate'].value, this.loggedUser.value.data.employeeId).subscribe(result => {
          //this.employeeAbsenceForm.controls['replaceEmployee'].setValue(undefined);
          this.options =  result;
        });
      }
    });

    this.employeeAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      if (value && this.employeeAbsenceForm.controls['fromDate'].value) {
        this.subsService.getSubstitutesByDate(this.employeeAbsenceForm.controls['fromDate'].value, value, this.loggedUser.value.data.employeeId).subscribe((result) => {
          //this.employeeAbsenceForm.controls['replaceEmployee'].setValue(undefined);
          this.options = result;
        });
      }
    });

    this.employeeAbsenceForm.controls['replaceEmployee'].valueChanges
      .pipe(startWith<string | Employee>(''),
        map((name: string) => {
          console.log(name);
          return name && name.length >= 0 ? this._filter(name) : this.options.slice()
        }),

      );
  }

  private _filter(name: string): any[] {
    if (this.options !== undefined) {
      this.options = this.options;
      return this.options.filter(
        (option: any) =>
          option.FirstName!.toLowerCase().indexOf(name.toLowerCase()) === 0
      );
      // return this.options.filter(
      //   (option: any) =>  option.FullName.includes(name.toLocaleLowerCase())
      // );
    }
  }

  displayFn(employee: any): string | undefined {
    //return typeof (option) === 'string' ? option : `${option.FirstName ? option.FirstName : 'nema ime'} ${option.Surname ? option.Surname : 'nema prezime'}`;
    return typeof (employee) === 'string' ? employee : `${employee.FirstName} ${employee.Surname}`;
  }

   
  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeeAbsenceForm.value;
    formResult.employeeId = this.loggedUser.value.data.employeeId;
    formResult.employeeEmail =  this.loggedUser.value.data.employeeEmail;
    console.log(JSON.stringify(formResult, null, 2));
    this.subsService.postAbsence(formResult);    
  }

}



