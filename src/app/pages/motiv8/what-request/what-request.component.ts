import { Component, OnInit, Input } from '@angular/core';
import { Category, Test, CategoryOfTask, WhatRequest, LoggedUserInfo } from 'src/app/models/logged-user-info';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Motiv8Service } from '../motiv8.service';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';


@Component({
  selector: 'hr-what-request',
  templateUrl: './what-request.component.html',
  styleUrls: ['./what-request.component.scss']
})
export class WhatRequestComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private motiv8Serivice: Motiv8Service) {}

   eventsSubscription: any;
   tempVal: any;
   errors: any;

  @Input() loggedUser: any;
  @Input() sharedEmployeeData: LoggedUserInfo;

  @Input() events: Observable<LoggedUserInfo>;

  userToDo: LoggedUserInfo;

  targetWhat = this.fb.group({
    TargetCategory: [''],
    TargetCategoryName: [''],
    TargetName: [''],
    MeasurableResult: [''],
    TargetDueDate: [''],
    TargetWeight: [''],
    TargetDescription: [''],
    TargetStatus: [''],
    Motiv8TargetID: [''],
    Motiv8SurveyAnswerID: [''],
    TargetStatusCode: ['']

  });

  minDate = new Date();

  categories: CategoryOfTask[];

  tasks: WhatRequest[];


  ifNewForumTrue: boolean;
  tempRes: any;
  canSend: any;

  addTask() {
    // tslint:disable-next-line:max-line-length
    if (!this.targetWhat.value.TargetName || !this.targetWhat.value.MeasurableResult || !this.targetWhat.value.TargetDueDate || !this.targetWhat.value.TargetDescription || Number(this.targetWhat.value.TargetWeight) > 20 || Number(this.targetWhat.value.TargetWeight) < 5 || !this.targetWhat.value.TargetCategory) {
      this.snackBar.open('Molimo Vas popunite sva polja ispravno.', 'OK', {
        duration: 4000,
      });
      return;
    }

    if (this.tasks.length === 7) {
      this.snackBar.open('Maksimalni broj ciljeva je 7', 'OK', {
        duration: 4000,
      });
      return;
    }

    if (this.tasks.length > 4) {

      for (let i = 0; i < this.tasks.length; i++) {
        this.tempVal += this.tasks[i].TargetWeight;
      }
      if ((this.tempVal + this.targetWhat.value.TargetWeight) > 100) {
        this.snackBar.open('Ukupna tezina svih ciljeva moze biti maksimum 100%', 'OK', {
          duration: 4000,
        });
        return;
       }
    }

    if (this.targetWhat.value.Motiv8TargetID) {
      this.targetWhat.value.LoggedEmployeeID = Number(this.loggedUser);
      this.motiv8Serivice.updateWhatTask(this.targetWhat.value).subscribe(res => {
        if ( res ) {
          this.snackBar.open('Uspesno izmenjen cilj.', 'OK', {
            duration: 4000,
          });
          this.targetWhat.reset();
          this.getTargetWhat(this.userToDo.SurveyAnswerID);
        }
       } );
    }

    if (!this.targetWhat.value.Motiv8TargetID) {
      this.targetWhat.value.Motiv8TargetID = -1;
     this.targetWhat.value.Motiv8SurveyAnswerID = this.userToDo.SurveyAnswerID;
      this.targetWhat.value.TargetCategory = Number(this.targetWhat.value.TargetCategory);
      this.targetWhat.value.LoggedEmployeeID = Number(this.loggedUser);
      this.motiv8Serivice.addNewWhatRequest(this.targetWhat.value).subscribe(res => {
        if ( res ) {
          this.snackBar.open('Uspesno dodat novi cilj.', 'OK', {
            duration: 4000,
          });
          this.targetWhat.reset();
          this.getTargetWhat(this.userToDo.SurveyAnswerID);
        }
      },
        error => {
        this.errors = error;
        this.snackBar.open('Doslo je do greske prilikom dodavanja.', 'OK', {
          duration: 4000,
        });
        return;
    });
    }

  }

  openNewForm() {
    this.ifNewForumTrue = true;
  }

  deleteUnsaved(index, taskId) {
    if (taskId) {
      this.motiv8Serivice.deleteWhatRequest(taskId).subscribe(res => {
        if ( res ) {
          this.snackBar.open('Uspesno obrisan cilj.', 'OK', {
            duration: 4000,
          });
          this.getTargetWhat(this.userToDo.SurveyAnswerID);
        }
       }
       );
    } else {
      this.tasks.splice(index, 1);
    }
  }

  edit(task) {
      this.ifNewForumTrue = true;
      this.targetWhat.patchValue({
      Motiv8TargetID: task.Motiv8TargetID,
      TargetCategory: task.TargetCategory,
      TargetCategoryName: task.TargetCategoryName,
      TargetName: task.TargetName,
      MeasurableResult: task.MeasurableResult,
      TargetDueDate: task.TargetDueDate,
      TargetWeight: task.TargetWeight,
      TargetDescription: task.TargetDescription,
      Motiv8SurveyAnswerID: task.Motiv8SurveyAnswerID,
      TargetStatus: task.TargetStatus,
      TargetStatusCode: task.TargetStatusCode
    });
  }

  reject(id) {
    this.motiv8Serivice.rejectTarget(id,  Number(this.loggedUser)).subscribe(res => {
      if ( res ) {
        this.snackBar.open('Odbili ste cilj.', 'OK', {
          duration: 4000,
        });
        this.getTargetWhat(this.userToDo.SurveyAnswerID);
      }
    } );
  }

  approve(id) {
    this.motiv8Serivice.approveTarget(id,  Number(this.loggedUser)).subscribe(res => {
      if ( res ) {
        this.snackBar.open('Uspesno set odobrili cilj.', 'OK', {
          duration: 4000,
        });
        this.getTargetWhat(this.userToDo.SurveyAnswerID);
      }
    });
  }

  // saveAndSendTarget(task) {
  //   task.TargetCategory = Number(task.TargetCategory);
  //   this.motiv8Serivice.saveAndSendTarget(task).subscribe(res => {
  //     if ( res ) {
  //       this.snackBar.open('Uspesno cuvanje i porosledjivanje cilja.', 'OK', {
  //         duration: 4000,
  //       });
  //       this.getTargetWhat(task.Motiv8SurveyAnswerID);
  //     }
  //   });
  // }
  saveAndSendAllTarget(tasks) {
    this.motiv8Serivice.saveAndSendAllTarget(tasks, this.userToDo.SurveyAnswerID,  Number(this.loggedUser)).subscribe(res => {
      if (res) {
        this.canSend = false;
        this.snackBar.open('Uspesno cuvanje i porosledjivanje cilja.', 'OK', {
          duration: 4000,
          });
          this.getTargetWhat(tasks[0].Motiv8SurveyAnswerID);
      }
    });
  }

  getTargetCategory() {
    this.motiv8Serivice.getTargetCategory().subscribe(res => {
      this.categories = res;
    });
  }

  getTargetWhat(id) {
    this.motiv8Serivice.getTargetWhat(id).subscribe(res => {
      this.tasks = res;
      console.log('taskovi', this.tasks);
      for (let i = 0; i < this.tasks.length; i++) {
         this.tempRes += this.tasks[i].TargetWeight;
      }
      if (Number(this.tempRes) === 100) {
        this.canSend = true;
      } else {
        this.tempRes = 0;
      }
    });
  }


  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(res => {
      this.userToDo = res;
      if (res) {
        this.getTargetWhat(this.userToDo.SurveyAnswerID);
        // console.log('ulgovani', this.loggedUser);
        // console.log('podaci po ulogovanom', this.userToDo);
      }
      });
    this.getTargetCategory();
    this.ifNewForumTrue = false;
    this.tempVal = 0;
    this.canSend = false;
    this.tempRes = 0;
  }

}
