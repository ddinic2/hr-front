import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceType } from 'src/app/models/absence-type';


@Component({
  selector: 'hr-paid-absence-form',
  templateUrl: './paid-absence-form.component.html',
  styleUrls: ['./paid-absence-form.component.scss']
})
export class PaidAbsenceFormComponent implements OnInit {

  employeePaidAbsenceForm: FormGroup;
  absenceTypeOptions: AbsenceType[] = [];

  constructor(private _fromBuilder: FormBuilder, public subService: SubstituteService) {
    this.employeePaidAbsenceForm = this._fromBuilder.group ({
      fromDate: [''],
      toDate: [''],
      absenceType: ['']
    });
   }

  ngOnInit() {
    
    this.subService.getAbsenceType().subscribe (res => {this.absenceTypeOptions = res})

  }

  saveAbsence() {
    let formValues = this.employeePaidAbsenceForm.value;
    console.log(JSON.stringify(formValues, null, 2));
  }

}
