import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CategoryOfTask, Status, WhatYearly, LoggedUserInfo } from 'src/app/models/logged-user-info';
import { MatSnackBar } from '@angular/material';
import { Motiv8Service } from '../motiv8.service';

@Component({
  selector: 'hr-what-yearly',
  templateUrl: './what-yearly.component.html',
  styleUrls: ['./what-yearly.component.scss']
})
export class WhatYearlyComponent implements OnInit {

  constructor( private fb: FormBuilder, public snackBar: MatSnackBar,  private motiv8Serivice: Motiv8Service) { }
  tasks: WhatYearly[];
  employeeWhat = this.fb.group({
    CategoryName: [''],
    MeasurableResult: [''],
    TargetWeight: [''],
    TargetDescription: [''],
    TargetEmployeeComment: [''],
    TargetManagerComment: [''],
    TargetManagerMark: [''],
    TargetEmployeeMark: [''],
    TargetStatus: [''],
    TargetEmployeeGrade: [''],
    TargetManagerGrade: ['']
  });

  @Input() loggedUser;

  categories: CategoryOfTask[];

  ifNewForumTrue: boolean;

  currentUser: LoggedUserInfo;

  edit(task) {
    console.log('izabrani', task);
    this.ifNewForumTrue = true;
    this.employeeWhat.patchValue({
      CategoryName: task.CategoryName,
      MeasurableResult: task.MeasurableResult,
      TargetEmployeeGrade: task.TargetEmployeeGrade,
      TargetManagerGrade: task.TargetManagerGrade,
      TargetDescription: task.TargetDescription,
      TargetEmployeeComment: task.TargetEmployeeComment,
      TargetManagerComment: task.TargetManagerComment,
      TargetStatus: task.TargetStatus
    });
    console.log('nova vrednost', this.employeeWhat.value);
  }

  getWhatYearly() {
    this.motiv8Serivice.getTargetWhatYearly(this.loggedUser).subscribe(res => {
      this.tasks = res;
      // console.log('tasks what yearly', this.tasks);
    });
  }

  getTargetCategory() {
    this.motiv8Serivice.getTargetCategory().subscribe(res => {
      this.categories = res;
      // console.log('kategorije', this.categories);
    });
  }

  saveExistTask() {
    // tslint:disable-next-line:max-line-length
    if (this.currentUser.EmployeeManagerID) {
      // tslint:disable-next-line:max-line-length
      if (!this.employeeWhat.valid || Number(this.employeeWhat.value.ManagerGrade) > 5 || Number(this.employeeWhat.value.ManagerGrade) < 1 ) {
        this.snackBar.open('Molimo Vas popunite sva polja ispravno.', 'OK', {
          duration: 4000,
        });
        return;
      }
    }
    if (!this.currentUser.EmployeeManagerID) {
      // tslint:disable-next-line:max-line-length
      if (!this.employeeWhat.valid || Number(this.employeeWhat.value.EmplGrade) > 5 || Number(this.employeeWhat.value.EmplGrade) < 1 ) {
        this.snackBar.open('Molimo Vas popunite sva polja ispravno.', 'OK', {
          duration: 4000,
        });
        return;
      }
    }
    this.motiv8Serivice.addYearlyTarget(this.employeeWhat.value).subscribe(res => {
      if (res) {
        this.snackBar.open('Uspesno ste izmenili cilj.', 'OK', {
          duration: 4000,
        });
        this.getWhatYearly();
      }
    });
    this.employeeWhat.reset();
  }

  getCurrentUser() {
    this.motiv8Serivice.getDataForLoggedUser(this.loggedUser).subscribe(res => {
      this.currentUser = res;
      // console.log('current User what', this.currentUser);
    });
  }

  ngOnInit() {
    this.ifNewForumTrue = false;
    this.getWhatYearly();
    this.getTargetCategory();
    this.getCurrentUser();
  }
}
