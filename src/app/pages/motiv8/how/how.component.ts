import { Component, OnInit, Input } from '@angular/core';
import { How, LoggedUserInfo } from 'src/app/models/logged-user-info';
import { FormBuilder , FormsModule } from '@angular/forms';
import { Motiv8Service } from '../motiv8.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'hr-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.scss']
})
export class HowComponent implements OnInit {

  @Input() loggedUser;
  @Input() events: Observable<LoggedUserInfo>;

  userToDo: LoggedUserInfo;
  eventsSubscription: any;

  tasks: any;
  task: How;
  haveAllGrade = false;
  showCompared = false;

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar , private motiv8Service: Motiv8Service) { }

  saveAndSend() {
   console.log('task my val', this.tasks);
   if (Number(this.loggedUser) !== this.userToDo.EmployeeID) {
     for (let i = 0; i < this.tasks.length; i++) {
       if (this.tasks[i].ManagerMark == null) {
        this.snackBar.open('Morate uneti sve ocene.', 'OK', {
          duration: 4000
        });
        return;
       }
     }
    this.motiv8Service.addHowByManager(this.tasks).subscribe(res => {
      if (res) {
       this.snackBar.open('Uspesno ste sacuvali i potvrdili.', 'OK', {
         duration: 4000
       });
       this.getHowList();
      }
    });
   }
   if (Number(this.loggedUser) === this.userToDo.EmployeeID) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].EmployeeMark == null) {
       this.snackBar.open('Morate uneti sve ocene.', 'OK', {
         duration: 4000
       });
       return;
      }
    }
    this.motiv8Service.addHowByEmployee(this.tasks).subscribe(res => {
      if (res) {
       this.snackBar.open('Uspesno ste sacuvali i prosledili.', 'OK', {
         duration: 4000
       });
       this.getHowList();
      }
    });
   }
  }

  getHowList() {
    this.motiv8Service.getListOfHow(this.userToDo.SurveyAnswerID).subscribe(res => {
      this.tasks = res;
      console.log('4 tab', this.tasks);
      for (let i = 0; i < this.tasks.length; i++) {
        if (!this.tasks[i].EmployeeMark || !this.tasks[i].ManagerMark) {
          this.haveAllGrade = false;
          return;
        } else {
          this.haveAllGrade = true;
        }
      }
    });
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(res =>  {
      this.userToDo = res;
      // console.log('prosledjeni', this.userToDo);
      if (res) {
        this.getHowList();
      }
      this.showCompared = false;
    });
  }

  compareGrade() {
    this.showCompared = !this.showCompared;
  }

}
