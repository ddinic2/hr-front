import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Motiv8Service } from '../motiv8.service';
import { getViewData } from '@angular/core/src/render3/instructions';
import { TotalYearly, WhatYearly, DevelopmentPlan, LoggedUserInfo } from 'src/app/models/logged-user-info';
import { MatSnackBar } from '@angular/material';

const lod = _;
@Component({
  selector: 'hr-total',
  templateUrl: './total-yearly.component.html',
  styleUrls: ['./total-yearly.component.scss']
})
export class TotalYearlyComponent implements OnInit {

  @Input()
  user;
  userData: LoggedUserInfo;

  // page source
  data = new TotalYearly();

  // autocomplete
  minimalChars = 3;
  filteredOptions;
  source: Function;
  searchCriteria = 'default';
  lastValue = '';
  filterFields = ['EmployeeFullName'];

  selectedPotential;
  potentialOptions;
  // plan razvoja
  devPlans;
  displayedColumns = ['DevelopmentNeed', 'DevelopmentAction', 'ResponsibleEmployeeFullName', 'Deadline'];

  constructor(private formBuilder: FormBuilder,  private service: Motiv8Service, public snackBar: MatSnackBar ) {

  }

  totalGrade = this.formBuilder.group({
    totalWHAT: [''],
    totalHOW: [''],
    total: [''],
    potential: [''],
    potentialDesc: [''],
    managerComment: [''],
    employeeComment: [''],
    devActivity: [''],
    devMentor: [''],
    devNeed: [''],
    devDeadline: ['']
  });

  ngOnInit() {
    this.service.getTotalYearly(this.user).subscribe(data => {
      this.data = data;
      this.patchValues();
    });
    this.service.getPotentials().subscribe(data => this.potentialOptions = data);
    this.service.getDevelopmentPlan(this.user).subscribe(data => this.devPlans = data);
    this.service.getDataForLoggedUser(this.user).subscribe(data => this.userData = data);
  }

  patchValues() {
    this.totalGrade.controls.totalWHAT.patchValue(this.data.TotalMarkWHAT);
    this.totalGrade.controls.totalHOW.patchValue(this.data.TotalMarkHOW);
    this.totalGrade.controls.total.patchValue(this.data.TotalMarkPerformance);
    this.totalGrade.controls.potential.patchValue(this.data.EmployeePotentialID);
    this.totalGrade.controls.potentialDesc.patchValue(this.data.EmployeePotentialDescription);
    this.totalGrade.controls.employeeComment.patchValue(this.data.TotalCommentEmployee);
    this.totalGrade.controls.managerComment.patchValue(this.data.TotalCommentManager);
  }

  getField = (source, fieldPath: string) => lod.get(source, fieldPath, '');

  saveDev() {
    const object = this.createDevPlan();
    if (object) {
      this.service.addDevelopmentPlan(object).subscribe(data => {
        console.log('USPEH');
        this.snackBar.open('Uspesno uneseni podaci', 'OK', {
          duration: 4000
        });
      });
    }
  }

  createDevPlan() {
    const object = new DevelopmentPlan();

    object.Deadline = this.totalGrade.controls.devDeadline.value;
    object.DevelopmentAction = this.totalGrade.controls.devActivity.value;
    object.DevelopmentNeed = this.totalGrade.controls.devNeed.value;
    object.Motiv8SurveyAnswerID = this.data.Motiv8SurveyAnswer;
    object.ResponsibleEmployeeFullName = this.userData.EmployeeFullName;
    object.ResponsibleEmployeeHRNumber = this.userData.EmployeeHRNumber;
    object.ResponsibleEmployeeID = this.userData.EmployeeID;

    return object;
  }

  saveToDatabase(row) {
    console.log(row);
  }



  // handleAutocomplete() {
  //   if (this.minimalChars === 0) {
  //     this.service('value', this.searchCriteria).subscribe(result => {
  //       this.filteredOptions = result;
  //     });
  // }

  //   if (this.source) {
  //     this.totalGrade.controls.devMentor.valueChanges
  //       .pipe(
  //         debounceTime(500),
  //         map(value => (value && typeof value === 'string' ? value : ''))
  //       )
  //       .subscribe(value => {
  //         if (value.length >= (this.minimalChars - 1 > 0 ? this.minimalChars : 0)) {
  //           if (value.includes(this.lastValue) && this.lastValue && this.lastValue.length < value.length) {
  //             this.filteredOptions = this._filter(value);
  //           } else {
  //             this.source(value, this.searchCriteria).subscribe(result => {
  //               console.log(this.searchCriteria);
  //               console.log(result);
  //               this.filteredOptions = result;
  //             });
  //           }
  //           this.lastValue = value;
  //         }
  //       });
  //   }
  // }
  // private _filter(value: string) {
  //   const filterValue = value.toLowerCase();

  //   if (!this.filteredOptions) {
  //     return;
  //   }

  //   return this.filteredOptions.filter(option => {
  //     let include = false;
  //     let str;
  //     this.filterFields.forEach(element => {
  //       str = this.getField(option, element) ? this.getField(option, element) : '';
  //       include = include || str.includes(filterValue);
  //     });
  //     return (
  //       include ||
  //       this.objectToString(option)
  //        .toLowerCase()
  //         .includes(filterValue)
  //     );
  //   });
  // }

  objectToString(option) {
    return this.getField(option, 'EmployeeFullName');
  }

  // da li je zaposleni ili rukovodilac
  canEdit() {
    return true;
  }

  saveAll() {
    const object = this.createObject();
    this.service.addTotalYearly(object).subscribe(data => {
      if (data) {
        this.snackBar.open('Uspesan unos podataka', 'OK', {
          duration: 4000,
        });
      } else {
        this.snackBar.open('Doslo je do greske pri cuvanju podataka', 'OK', {
          duration: 4000,
        });
      }
    }) ;
  }

  createObject() {
    const object = new TotalYearly();

    object.Motiv8Survey = this.data.Motiv8Survey;
    object.Motiv8SurveyAnswer = this.data.Motiv8SurveyAnswer;
    object.TotalMarkWHAT = this.totalGrade.controls.totalWHAT.value;
    object.TotalMarkHOW = this.totalGrade.controls.totalHOW.value;
    object.TotalMarkPerformance = this.totalGrade.controls.total.value;
    object.EmployeePotentialDescription = this.totalGrade.controls.potentialDesc.value;
    object.EmployeePotentialID = this.totalGrade.controls.potential.value;
    object.TotalCommentEmployee = this.totalGrade.controls.employeeComment.value;
    object.TotalCommentManager = this.totalGrade.controls.managerComment.value;

    console.log(object);
    return object;
  }

}
