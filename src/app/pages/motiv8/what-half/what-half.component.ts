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
import { Observable } from 'rxjs';

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
    CommentEmployeeHY: [''],
    CommentManagerHY: [''],
    AgreedActionPlanHY: [''],
    Motiv8SurveyAnswer: ['']
  });

  categories: CategoryOfTask[];
  statuses: Status[];
  comments: any;

  eventsSubscription: any;
  currentUser: LoggedUserInfo;
  @Input() loggedUser;
  @Input() events: Observable<LoggedUserInfo>;

  userToDo: LoggedUserInfo;

  edit(task) {
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
  }

  addComment() {
    if (Number(this.loggedUser) !== this.userToDo.EmployeeID) {
      this.commentArea.value.CommentEmployeeHY = this.comments.CommentEmployeeHY;
      this.commentArea.value.AgreedActionPlanHY = this.comments.AgreedActionPlanHY;
    }
    this.commentArea.value.Motiv8SurveyAnswer = this.tasks[0].Motiv8SurveyAnswerID;
    this.motiv8Service.addCommentHalf(this.commentArea.value).subscribe(res => {
      if (res) {
        this.snackBar.open('Uspesno ste ostavili komentar.', 'OK', {
          duration: 4000
        });
        this.motiv8Service.getCommentForHY(this.tasks[0].Motiv8SurveyAnswerID).subscribe(res1 => {
          this.comments = res1;
        });
        this.commentArea.reset();
      }
    });
  }

  saveExistTask() {
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
    this.employeeWhat.value.LoggedEmployeeID = Number(this.loggedUser);
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

  confirmeEmployee(task) {
    task.LoggedEmployeeID = Number(this.loggedUser);
    this.motiv8Service.confirmeEmployeeHalf(task).subscribe(res => {
      if (res) {
        this.snackBar.open('Uspesno ste potvrdili.', 'OK', {
          duration: 4000
        });
        this.getTargetWhatHalf();
      }
    });
  }

  confirmeManager(task) {
    task.LoggedEmployeeID = Number(this.loggedUser);
    this.motiv8Service.confirmeManagerHalf(task).subscribe(res => {
      if (res) {
        this.snackBar.open('Uspesno ste potvrdili.', 'OK', {
          duration: 4000
        });
        this.getTargetWhatHalf();
      }
    });
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
    });
  }

  getTargetWhatHalf() {
    this.motiv8Service.getTargetWhatHalf(this.userToDo.SurveyAnswerID).subscribe(res => {
      this.tasks = res;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].TargetEvaluationStatus === 3 || this.tasks[i].TargetEvaluationStatus === 5) {
          this.tasks[i].Collor = 'green';
        }
        if (this.tasks[i].TargetEvaluationStatus === 2 || this.tasks[i].TargetEvaluationStatus === 4) {
          this.tasks[i].Collor = 'red';
        }
        if (this.tasks[i].TargetEvaluationStatus === 1) {
          this.tasks[i].Collor = 'black';
        }
      }
      if (this.tasks[0]) {
        this.motiv8Service.getCommentForHY(this.tasks[0].Motiv8SurveyAnswerID).subscribe(res1 => {
          this.comments = res1;
        });
      }
    });
  }

  // tslint:disable-next-line:member-ordering
  ifNewForumTrue: boolean;

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(res =>  {
      this.userToDo = res;
      if (res) {
        this.getTargetWhatHalf();
      }
      });
    this.getStatusOfTask();
    this.getTargetCategory();

    this.ifNewForumTrue = false;
  }
}
