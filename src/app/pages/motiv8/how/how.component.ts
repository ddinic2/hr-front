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

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar , private motiv8Service: Motiv8Service) { }

  save() {
   console.log('task my val', this.tasks);
   this.motiv8Service.addHow(this.tasks).subscribe(res => {
     if (res) {
      this.snackBar.open('Uspesno ste sacuvali.', 'OK', {
        duration: 4000
      });
      this.getHowList();
     }
   });
  }

  getHowList() {
    this.motiv8Service.getListOfHow(this.userToDo.SurveyAnswerID).subscribe(res => {
      this.tasks = res;
      console.log('taskovi HOW', this.tasks);
    });
  }


  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(res =>  {
      this.userToDo = res;
      console.log('prosledjeni', this.userToDo);
      if (res) {
        this.getHowList();
      }
      });
  }

}
