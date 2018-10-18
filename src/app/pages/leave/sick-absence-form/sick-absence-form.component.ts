import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceSickLeaveType } from 'src/app/models/absence-sick-leave-type';
import { AbsenceSubtype } from 'src/app/models/absence-subtype';
import { SickLeaveCode } from 'src/app/models/sick-leave-code';


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
  
  constructor(private _formBuilder: FormBuilder, public subService: SubstituteService) {
    this.employeeSickAbsenceForm = this._formBuilder.group({
      fromDate: [''],
      toDate: [''],
      sickLeaveType: ['']
    });
  }

  ngOnInit() {
    this.subService.getAbsenceSickLeaveType().subscribe(res => { this.sickLeaveTypeOptions = res});
    this.subService.getAbsenceSubtype().subscribe(res => {this.absenceSubtypeOptions = res});
    this.subService.getSickLeaveCode().subscribe(res => {this.sickLeaveCodeOptions = res});
  }

  saveAbsence() {
    let formValues = this.employeeSickAbsenceForm.value;
    console.log(JSON.stringify(formValues, null, 2));
  }

}
