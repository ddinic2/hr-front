import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceSubtype } from 'src/app/models/absence-subtype';
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { LoginService } from 'src/app/shared/shared/login.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'hr-paid-absence-form',
  templateUrl: './paid-absence-form.component.html',
  styleUrls: ['./paid-absence-form.component.scss']
})
export class PaidAbsenceFormComponent implements OnInit {
  public retPostData;
  employeePaidAbsenceForm: FormGroup;
  loggedUser: any;
  absenceTypes = AbsenceTypes;
  absenceProcessStatus = AbsenceProcessStatus;
  absenceSubtypeOptions: AbsenceSubtype[] = [];

  disableWeekdays = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }
  
  constructor(private _fromBuilder: FormBuilder, public subsService: SubstituteService, public loginService: LoginService, public snackBar: MatSnackBar) {
    this.employeePaidAbsenceForm = this._fromBuilder.group ({
      fromDate: [''],
      toDate: [''],
      absenceSubtype: [''],
      absenceType: this.absenceTypes.PaidAbsence,
      absenceProcessStatus: this.absenceProcessStatus.Created 
    });
    
   }

  ngOnInit() {
    this.subsService.getAbsenceSubtype().subscribe (res => {this.absenceSubtypeOptions = res});
    this.loggedUser =  this.loginService.getLoggedInUser();

    
    this.employeePaidAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      if (value && this.employeePaidAbsenceForm.controls['fromDate'].value) {
        this.subsService.getSubstitutesByDate(this.employeePaidAbsenceForm.controls['fromDate'].value, value, this.loggedUser.value.data.employeeId).subscribe((result) => {
          if(result == null)
          {
            this.snackBar.open('Postoji odsustvo za ovaj vremenski period!', 'OK', {
              duration: 10000,
              verticalPosition: 'top'
            });
          }
          
        });
      }
    });

  }  

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeePaidAbsenceForm.value;
    formResult.employeeId = this.loggedUser.value.data.employeeId;
    formResult.employeeEmail =  this.loggedUser.value.data.employeeEmail;
    this.subsService.postAbsence(formResult).subscribe(res => {
      this.retPostData = res;
      this.snackBar.open(this.retPostData, 'OK', {
      duration: 10000,
      verticalPosition: 'top'
    });
  });  
  console.log(JSON.stringify(formResult, null, 2));   
  }

}
