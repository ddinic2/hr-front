import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceType } from 'src/app/models/absence-type';
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { LoginService } from 'src/app/shared/shared/login.service';


@Component({
  selector: 'hr-paid-absence-form',
  templateUrl: './paid-absence-form.component.html',
  styleUrls: ['./paid-absence-form.component.scss']
})
export class PaidAbsenceFormComponent implements OnInit {

  employeePaidAbsenceForm: FormGroup;
  absenceTypeOptions: AbsenceType[] = [];
  loggedUser: any;
  absenceTypes = AbsenceTypes;
  absenceProcessStatus = AbsenceProcessStatus;

  constructor(private _fromBuilder: FormBuilder, public subService: SubstituteService, public loginService: LoginService) {
    this.employeePaidAbsenceForm = this._fromBuilder.group ({
      fromDate: [''],
      toDate: [''],
      employeeId:[''],
      employeeEmail: [''],
      absenceProcessStatus: this.absenceProcessStatus.Created    
    });
   }

  ngOnInit() {
    
    this.subService.getAbsenceType().subscribe (res => {this.absenceTypeOptions = res})
    this.loggedUser =  this.loginService.getLoggedInUser();
  }

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeePaidAbsenceForm.value;
    formResult.employeeId = this.loggedUser.value.data.employeeId;
    formResult.employeeEmail = this.loggedUser.value.data.employeeEmail;
    this.subService.postAbsence(formResult);    
  }

}
