import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  Category,
  Status,
  CategoryOfTask,
  WhatHalf,
  LoggedUserInfo
} from 'src/app/models/logged-user-info';
import { MatSnackBar } from '@angular/material';
import { Motiv8Service } from '../motiv8.service';

@Component({
  selector: 'hr-what-half',
  templateUrl: './what-half.component.html',
  styleUrls: ['./what-half.component.scss']
})
export class WhatHalfComponent implements OnInit {
  tasks: WhatHalf[];
  employeeWhat = this.fb.group({
    TargetCategory: [''],
    TargetName: [''],
    MeasurableResult: [''],
    TargetDueDate: [''],
    TargetWeight: [''],
    TargetDescription: [''],
    TargetStatus: [''],
    TargetEvaluationProgressPercent: [''],
    TargetEmployeeMark: [''],
    TargetManagerMark: [''],
    Motiv8TargetID: [''],
    Motiv8SurveyAnswerID: [''],
    TargetEvaluationPeriod: [''],
    TargetEvaluationStatus: ['']
  });

  commentArea = this.fb.group({
    TargetEmployeeComment: [''],
    TargetManagerComment: [''],
    TargetActionPlane: [''],
    Motiv8SurveyAnswerID: ['']
  });

  categories: CategoryOfTask[];
  statuses: Status[];

  currentUser: LoggedUserInfo;
  @Input() loggedUser;

  edit(task) {
    console.log('izabrani', task);
    this.ifNewForumTrue = true;
    this.employeeWhat.patchValue({
      Motiv8TargetID: task.Motiv8TargetID,
      Motiv8SurveyAnswerID: task.Motiv8SurveyAnswerID,
      TargetCategory: task.TargetCategory,
      CategoryName: task.TargetCategoryName,
      TargetName: task.TargetName,
      MeasurableResult: task.MeasurableResult,
      TargetDueDate: task.TargetDueDate,
      TargetWeight: task.TargetWeight,
      TargetDescription: task.TargetDescription,
      TargetEmployeeComment: task.TargetEmployeeComment,
      TargetManagerComment: task.TargetManagerComment,
      TargetStatus: task.TargetStatus,
      TargetEvaluationProgressPercent: task.TargetEvaluationProgressPercent,
      TargetEmployeeMark: task.TargetEmployeeMark,
      TargetManagerMark: task.TargetManagerMark,
      TargetEvaluationPeriod: task.TargetEvaluationPeriod,
      TargetEvaluationStatus: task.TargetEvaluationStatus
    });
    console.log('nova vrednost', this.employeeWhat.value);
  }

  addComment() {
    alert('dodaj komentar');
  }

  saveExistTask() {
    console.log('update exist', this.employeeWhat.value);
    if (
      !this.employeeWhat.valid ||
      Number(this.employeeWhat.value.TargetEvaluationProgressPercent) > 100 ||
      Number(this.employeeWhat.value.TargetEvaluationProgressPercent < 0) ||
      !this.employeeWhat.value.TargetEvaluationStatus
    ) {
      this.snackBar.open('Molimo Vas popunite sva polja ispravno.', 'OK', {
        duration: 4000
      });
      return;
    }
    this.motiv8Service.addHalfYearTarget(this.employeeWhat.value).subscribe(res => {
      if (res) {
        this.snackBar.open('Uspesno ste izmenili cilj.', 'OK', {
          duration: 4000
        });
        this.getTargetWhatHalf();
      }
    });
    this.employeeWhat.reset();
    this.ifNewForumTrue = false;
  }

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private motiv8Service: Motiv8Service
  ) {}

  getStatusOfTask() {
    this.motiv8Service.getHalfWhatStatus().subscribe(res => {
      this.statuses = res;
    });
  }

  getTargetCategory() {
    this.motiv8Service.getTargetCategory().subscribe(res => {
      this.categories = res;
      console.log('kategorije', this.categories);
    });
  }

  getTargetWhatHalf() {
    this.motiv8Service.getTargetWhatHalf(this.loggedUser).subscribe(res => {
      this.tasks = res;
      console.log('res tab 2', this.tasks);
    });
  }

  // tslint:disable-next-line:member-ordering
  ifNewForumTrue: boolean;

  getCurrentUser() {
    this.motiv8Service.getDataForLoggedUser(this.loggedUser).subscribe(res => {
      this.currentUser = res;
      console.log('current User what Half', this.currentUser);
    });
  }
  ngOnInit() {
    this.getStatusOfTask();
    this.getTargetCategory();

    this.ifNewForumTrue = false;
    this.getTargetWhatHalf();
    this.getCurrentUser();
  }
}
