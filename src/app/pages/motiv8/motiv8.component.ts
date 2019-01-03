import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/shared/shared/login.service';
import { Motiv8Service } from 'src/app/pages/motiv8/motiv8.service';
import { LoggedUserInfo } from 'src/app/models/logged-user-info';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'hr-motiv8',
  templateUrl: './motiv8.component.html',
  styleUrls: ['./motiv8.component.scss']
})
export class Motiv8Component implements OnInit {

  constructor(private loginService: LoginService, private motiv8Service: Motiv8Service) { }
  currentUser: any;
  currentUserInfo: any;
  listOfEmployeeByManager: any;
  EmployeeID = null;
  sharedEmployee: any;
  ifData: any;
  year: any;

  eventsSubject: Subject<LoggedUserInfo> = new Subject<LoggedUserInfo>();

  chosenYearDate = new Date(2019, 1, 1);

filterYear() {
   this.year = this.chosenYearDate.getFullYear();
   this.getLoggedNow();
}

getLoggedNow() {
  this.loginService.getLoggedInUser().subscribe(res => {
    this.currentUser = res.data.employeeId;
      this.motiv8Service.getDataForLoggedUser(this.currentUser,  this.year).subscribe(res2 => {
        this.currentUserInfo = res2;
        this.ifData = true;
        if (this.currentUserInfo.EmployeeIsManager) {
          this.motiv8Service.getEmployeeByManager(this.currentUserInfo.EmployeeID).subscribe(res3 => {
            this.listOfEmployeeByManager = res3;
          });
        }
      });
    });
}

getDataForEmployee() {
  this.motiv8Service.getDataForLoggedUser(this.EmployeeID,  this.year).subscribe(res => {
    this.sharedEmployee = res;
    this.eventsSubject.next(this.sharedEmployee);
  });
}

getDataForMe() {
  this.sharedEmployee = this.currentUserInfo;
  this.eventsSubject.next(this.sharedEmployee);
}

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.getLoggedNow();
    this.ifData = false;
  }

}
