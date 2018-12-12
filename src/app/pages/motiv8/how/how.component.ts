import { Component, OnInit, Input } from '@angular/core';
import { How, LoggedUserInfo } from 'src/app/models/logged-user-info';
import { FormBuilder , FormsModule } from '@angular/forms';
import { Motiv8Service } from '../motiv8.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hr-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.scss']
})
export class HowComponent implements OnInit {

  @Input() loggedUser;

  currentUser: any;
  tasks: any;
  task: How;
  temp: any;

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar , private motiv8Service: Motiv8Service) { }

  gradeHow = this.fb.group({
    EmployeeGradeFor1: [''],
    ManagerGradeFor1: [''],
    EmployeeGradeFor2: [''],
    ManagerGradeFor2: [''],
    EmployeeGradeFor3: [''],
    ManagerGradeFor3: [''],
    EmployeeGradeFor4: [''],
    ManagerGradeFor4: ['']
  });

  save() {
   console.log('task my val', this.tasks);
   this.motiv8Service.addHow(this.tasks).subscribe(res => {
     if (res) {
      this.snackBar.open('Uspesno ste sacuvali.', 'OK', {
        duration: 4000
      });
      this.getHowList(this.temp);
     }
   });
  }

  getHowList(id) {
    this.motiv8Service.getListOfHow(id).subscribe(res => {
      this.tasks = res;
      console.log('taskovi HOW', this.tasks);
    });
  }


  getCurrentUser() {
    this.motiv8Service.getDataForLoggedUser(this.loggedUser).subscribe(res => {
      this.currentUser = res;
      if (this.currentUser) {
        this.temp =  this.currentUser.EmployeeID;
        this.getHowList(this.temp);
      }
      console.log('current User HOW', this.currentUser);
    });
  }


  ngOnInit() {
    this.getCurrentUser();
  }

}
