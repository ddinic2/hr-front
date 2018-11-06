import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceSickLeaveType } from 'src/app/models/absence-sick-leave-type';
import { AbsenceSubtype } from 'src/app/models/absence-subtype';
import { SickLeaveCode } from 'src/app/models/sick-leave-code';
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { LoginService } from 'src/app/shared/shared/login.service';


@Component({
  selector: 'hr-sick-absence-form',
  templateUrl: './sick-absence-form.component.html',
  styleUrls: ['./sick-absence-form.component.scss']
})
export class SickAbsenceFormComponent implements OnInit {
  employeeSickAbsenceForm: FormGroup;
  // filteredSickLeaveTypeOptions: Observable<AbsenceSickLeaveType[]>;
  sickLeaveTypeOptions: AbsenceSickLeaveType[] = [];
  absenceSubtypeOptions: AbsenceSubtype[] = [];
  sickLeaveCodeOptions: SickLeaveCode[] = [];
  loggedUser: any;
  absenceTypes = AbsenceTypes;
  absenceProcessStatus = AbsenceProcessStatus;
  
  constructor(private _formBuilder: FormBuilder, public subService: SubstituteService, public loginService: LoginService) {
    this.employeeSickAbsenceForm = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
      sickLeaveType: [''],
      absenceSubtype:[''],
      sickLeaveCode: [''],
      absenceType: this.absenceTypes.SickAbsence,
      absenceProcessStatus: this.absenceProcessStatus.Created 
    });
  }

  ngOnInit() {
    this.subService.getAbsenceSickLeaveType().subscribe(res => { this.sickLeaveTypeOptions = res});
    this.subService.getAbsenceSubtype().subscribe(res => {this.absenceSubtypeOptions = res});
    this.subService.getSickLeaveCode().subscribe(res => {this.sickLeaveCodeOptions = res});
    this.loggedUser =  this.loginService.getLoggedInUser();
  }

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeeSickAbsenceForm.value;
    formResult.employeeId = this.loggedUser.value.data.employeeId;
    formResult.employeeEmail =  this.loggedUser.value.data.employeeEmail;
    this.subService.postAbsence(formResult);     
  }

}
