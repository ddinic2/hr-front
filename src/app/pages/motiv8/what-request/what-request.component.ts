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
  // categories: Category[];
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public snackBar: MatSnackBar, private motiv8Serivice: Motiv8Service) {}

  @Input() loggedUser: any;
  @Input() sharedEmployeeData: LoggedUserInfo;
  @Input() event: EventEmitter;

  currentUser: LoggedUserInfo;

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

  sharedEmployeeDataToChild(event) {
    console.log('evo ga evventtt!!!', event);
  }

  addTask() {
    console.log(this.targetWhat.value);

    // tslint:disable-next-line:max-line-length
    if (!this.targetWhat.value.TargetName || !this.targetWhat.value.MeasurableResult || !this.targetWhat.value.TargetDueDate || !this.targetWhat.value.TargetDescription || Number(this.targetWhat.value.TargetWeight) > 20 || Number(this.targetWhat.value.TargetWeight) < 5 || !this.targetWhat.value.TargetCategory) {
      this.snackBar.open('Molimo Vas popunite sva polja ispravno.', 'OK', {
        duration: 4000,
      });
      return;
    }

    if (this.tasks.length === 6) {
      this.snackBar.open('Maksimalni broj ciljeva je 7', 'OK', {
        duration: 4000,
      });
      return;
    }

    if (this.targetWhat.value.Motiv8TargetID) {
      this.motiv8Serivice.updateWhatTask(this.targetWhat.value).subscribe(res => {
        if ( res ) {
          this.snackBar.open('Uspesno izmenjen cilj.', 'OK', {
            duration: 4000,
          });
          this.getTargetWhat();
        }
       } );
    }

    if (!this.targetWhat.value.Motiv8TargetID) {
      this.targetWhat.value.Motiv8TargetID = -1;
      this.targetWhat.value.Motiv8SurveyAnswerID = 2;
      this.targetWhat.value.TargetCategory = Number(this.targetWhat.value.TargetCategory);
      this.motiv8Serivice.addNewWhatRequest(this.targetWhat.value).subscribe(res => {
        if ( res ) {
          this.snackBar.open('Uspesno dodat novi cilj.', 'OK', {
            duration: 4000,
          });
          this.getTargetWhat();
        }
      });
    }

    this.targetWhat.reset();
    // console.log('taskovi', this.tasks);
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
          this.getTargetWhat();
        }
       }
       );
    } else {
      // console.log('index', index);
      this.tasks.splice(index, 1);
    }
  }

  edit(task) {
    // console.log('izabrani', task);
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
    // console.log('nova vrednost', this.targetWhat.value);
  }

  reject(id) {
    this.motiv8Serivice.rejectTarget(id).subscribe(res => {
      if ( res ) {
        this.snackBar.open('Odbili ste cilj.', 'OK', {
          duration: 4000,
        });
        this.getTargetWhat();
      }
    } );
  }

  approve(id) {
    this.motiv8Serivice.approveTarget(id).subscribe(res => {
      if ( res ) {
        this.snackBar.open('Uspesno set odobrili cilj.', 'OK', {
          duration: 4000,
        });
        this.getTargetWhat();
      }
    });
  }

  saveAndSendTarget(task) {
    task.TargetCategory = Number(task.TargetCategory);
    this.motiv8Serivice.saveAndSendTarget(task).subscribe(res => {
      if ( res ) {
        this.snackBar.open('Uspesno cuvanje i porosledjivanje cilja.', 'OK', {
          duration: 4000,
        });
        this.getTargetWhat();
      }
    });
  }

  getTargetCategory() {
    this.motiv8Serivice.getTargetCategory().subscribe(res => {
      this.categories = res;
      // console.log('dropdown category', this.categories);
    });
  }

  getTargetWhat() {
    this.motiv8Serivice.getTargetWhat(2).subscribe(res => {
      this.tasks = res;
      console.log('tab 1', this.tasks);
    });
  }

  getCurrentUser() {
     this.motiv8Serivice.getDataForLoggedUser(this.loggedUser).subscribe(res => {
       this.currentUser = res;
       console.log('current User what', this.currentUser);
     });
   }

  ngOnInit() {
    this.getTargetCategory();
    this.ifNewForumTrue = false;
    this.getTargetWhat();
    this.getCurrentUser();
  }

}
