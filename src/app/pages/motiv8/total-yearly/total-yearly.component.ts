import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Motiv8Service } from '../motiv8.service';
import { getViewData } from '@angular/core/src/render3/instructions';
import { TotalYearly, WhatYearly, DevelopmentPlan, LoggedUserInfo } from 'src/app/models/logged-user-info';
import { MatSnackBar, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { Observable } from 'rxjs';

const lod = _;

@Component({
  selector: 'hr-total',
  templateUrl: './total-yearly.component.html',
  styleUrls: ['./total-yearly.component.scss']
})
export class TotalYearlyComponent implements OnInit {

  @ViewChild('devPlanForm') myForm;

  @Input()
  user;
  loggedUserData: LoggedUserInfo;

  @Input()
  events: Observable<LoggedUserInfo>;
  eventsSubscription: any;

  userData: LoggedUserInfo;

  // page source
  data = new TotalYearly();

  // autocomplete
  minimalChars = 2;
  filteredOptions;
  searchCriteria = 'default';
  lastValue = '';
  filterFields = ['FirstName', 'Surname'];

  selectedPotential;
  potentialOptions;
  // plan razvoja
  devPlans = [];
  displayedColumns = ['DevelopmentNeed', 'DevelopmentAction', 'ResponsibleEmployeeFullName', 'Deadline', 'Buttons'];
  isDevEdit = false;
  currentEditElement: DevelopmentPlan;
  currentYear: any;

  constructor(private formBuilder: FormBuilder,  private service: Motiv8Service, public snackBar: MatSnackBar ) {

  }

  totalGrade = this.formBuilder.group({
    totalWHAT: [''],
    totalHOW: [''],
    total: [''],
    potential: [''],
    potentialDesc: [''],
    managerComment: [''],
    employeeComment: ['']
  });

  devPlan = this.formBuilder.group({
    devActivity: [''],
    devMentor: [''],
    devNeed: [''],
    devDeadline: ['']
  });

  ngOnInit() {

    this.currentYear = new Date().getFullYear();

    this.totalGrade.disable();
    this.service.getDataForLoggedUser(this.user, this.currentYear).subscribe(res => {
      this.loggedUserData = res;
    });


    this.eventsSubscription = this.events.subscribe(res =>  {
      this.userData = res;
      if (res) {
        if (this.canEdit()) {
          this.totalGrade.enable();
          this.totalGrade.controls.employeeComment.disable();
        } else {
          this.totalGrade.disable();
          this.totalGrade.controls.employeeComment.enable();
        }
        this.service.getTotalYearly(this.userData.SurveyAnswerID).subscribe(data => {
          this.data = data;
          this.patchValues();
        });
        this.service.getPotentials().subscribe(data => this.potentialOptions = data);
        this.service.getDevelopmentPlan(this.userData.SurveyAnswerID).subscribe(data => this.devPlans = data);
      }
    });

  this.handleAutocomplete();

  }

  patchValues() {

    if (!this.data) {
      this.totalGrade.reset();
      return;
    }
    this.totalGrade.controls.totalWHAT.setValue(this.data.TotalMarkWHAT ? this.data.TotalMarkWHAT : undefined);
    this.totalGrade.controls.totalHOW.setValue(this.data.TotalMarkHOW ? this.data.TotalMarkHOW : undefined);
    this.totalGrade.controls.total.setValue(this.data.TotalMarkPerformance ? this.data.TotalMarkPerformance : undefined);
    this.totalGrade.controls.potential.setValue(this.data.EmployeePotentialID);
    this.totalGrade.controls.potentialDesc.setValue(this.data.EmployeePotentialDescription);
    this.totalGrade.controls.employeeComment.setValue(this.data.TotalCommentEmployee);
    this.totalGrade.controls.managerComment.setValue(this.data.TotalCommentManager);


  }

  getField = (source, fieldPath: string) => lod.get(source, fieldPath, '');

  saveDev() {
    const object = this.createDevPlan();
    if (object) {
      this.service.addDevelopmentPlan(object).subscribe(data => {
        this.service.getDevelopmentPlan(this.userData.SurveyAnswerID).subscribe(res => {
          this.devPlans = res;
        });
        this.throwOk();
      });
    }
    this.isDevEdit = false;
    this.devPlan.reset();
    this.myForm.resetForm();
  }

  createDevPlan() {
    const object = new DevelopmentPlan();

    object.Deadline = this.devPlan.controls.devDeadline.value;
    object.DevelopmentAction = this.devPlan.controls.devActivity.value;
    object.DevelopmentNeed = this.devPlan.controls.devNeed.value;
    if (this.isDevEdit) {
      object.Motiv8SurveyAnswerID = this.currentEditElement.Motiv8SurveyAnswerID;
      object.Motiv8DevelopmentActionPlan = this.currentEditElement.Motiv8DevelopmentActionPlan;
    } else {
      object.Motiv8SurveyAnswerID = this.data.Motiv8SurveyAnswer;
    }
    object.ResponsibleEmployeeFullName = this.devPlan.controls.devMentor.value.FirstName +
     ' ' + this.devPlan.controls.devMentor.value.Surname;
    object.ResponsibleEmployeeHRNumber = this.devPlan.controls.devMentor.value.EmployeeHRNumber;
    object.ResponsibleEmployeeID = this.devPlan.controls.devMentor.value.EmployeeID;

    return object;
  }

  deleteDev = (element: DevelopmentPlan) => {
    if (!element) {
      this.throwError();
    } else {
      this.service.deleteDevelopmentPlan(element.Motiv8DevelopmentActionPlan).subscribe(data => {
        if (data === 1) {
          this.throwOk();
          this.service.getDevelopmentPlan(this.userData.SurveyAnswerID).subscribe(res => {
            this.devPlans = res;
          });
        } else {
          this.throwError();
        }
      });
    }
  }

  editDev(element: DevelopmentPlan) {
    this.isDevEdit = true;
    this.setDevFields(element);
    this.currentEditElement = element;
  }

  setDevFields(element: DevelopmentPlan) {
    this.devPlan.controls.devNeed.setValue(element.DevelopmentNeed);
    this.devPlan.controls.devActivity.patchValue(element.DevelopmentAction);
    this.devPlan.controls.devDeadline.setValue(element.Deadline);
    this.service.getEmployeeLike(element.ResponsibleEmployeeFullName.split(' ')[0])
            .subscribe(data => this.devPlan.controls.devMentor.setValue(data[0]));
  }

  handleAutocomplete = () => {
    if (this.minimalChars === 0) {
      this.service.getEmployeeLike('').subscribe(result => {
        this.filteredOptions = result;
      });
  }
      this.devPlan.controls.devMentor.valueChanges
        .pipe(
          debounceTime(500),
          map(value => (value && typeof value === 'string' ? value : ''))
        )
        .subscribe(value => {
          if (value.length >= (this.minimalChars - 1 > 0 ? this.minimalChars : 0)) {
            if (value.includes(this.lastValue) && this.lastValue && this.lastValue.length < value.length) {
              this.filteredOptions = this._filter(value);
            } else {
              this.service.getEmployeeLike(value).subscribe(result => {
                this.filteredOptions = result;
              });
            }
            this.lastValue = value;
          }
        });
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    if (!this.filteredOptions) {
      return;
    }

    return this.filteredOptions.filter(option => {
      let include = false;
      let str;
      this.filterFields.forEach(element => {
        str = this.getField(option, element) ? this.getField(option, element).toLowerCase() : '';
        include = include || str.includes(filterValue);
      });
      return (
        include ||
        this.objectToString(option)
         .toLowerCase()
          .includes(filterValue)
      );
    });
  }

  objectToString = (option) => {
    if (!option) {
      return '';
    }
    return this.getField(option, 'FirstName') + ' ' + this.getField(option, 'Surname');
  }

  // da li je zaposleni ili rukovodilac
  canEdit(): boolean {
    return this.loggedUserData && this.userData &&
            this.loggedUserData.EmployeeIsManager && this.loggedUserData.EmployeeID !== this.userData.EmployeeID;
  }

  saveAll() {
    const object = this.createObject();
    this.service.addTotalYearly(object).subscribe(data => {
      if (data) {
        this.throwOk();
      } else {
        this.throwError();
      }
    }) ;
  }

  createObject() {

    if (!this.data) {
      this.throwError();
    }

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

    return object;
  }

  throwOk() {
    this.snackBar.open('Uspesno', 'OK', {
      duration: 4000,
    });
  }

  throwError() {
    this.snackBar.open('Doslo je do greske', 'OK', {
      duration: 4000,
    });
  }

  print() {
    return this.service.downloadDoc(this.loggedUserData.SurveyAnswerID)
    .subscribe(data => {
      let thefile = {};
      thefile = data;
      const url = URL.createObjectURL(data.body);
      const disposition = data.headers.getAll('content-disposition');
      const filename = (this.loggedUserData.EmployeeHRNumber).toString() + '_' + (this.loggedUserData.SurveyAnswerID).toString();
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
    });
  }
}
