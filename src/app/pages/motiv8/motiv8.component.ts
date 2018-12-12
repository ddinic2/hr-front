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

  // private dataSource = new BehaviorSubject<LoggedUserInfo>(new Data());
  // data = this.dataSource.asObservable();

  // @Output() sharedEmployeeData = new EventEmitter<any>();
  eventsSubject: Subject<LoggedUserInfo> = new Subject<LoggedUserInfo>();


getLoggedNow() {
  this.loginService.getLoggedInUser().subscribe(res => {
    this.currentUser = res.data.employeeId;
    // console.log('Motiv 8 controler CURR us', this.currentUser);
      this.motiv8Service.getDataForLoggedUser(this.currentUser).subscribe(res2 => {
        this.currentUserInfo = res2;
         console.log('Motiv 8 controler CURR us INFO', this.currentUserInfo);
        if (this.currentUserInfo.EmployeeIsManager) {
          this.motiv8Service.getEmployeeByManager(this.currentUserInfo.EmployeeID).subscribe(res3 => {
            this.listOfEmployeeByManager = res3;
            // console.log('lista zaposlenih po manegeru 30', this.listOfEmployeeByManager);
          });
        }
      });
    });
}

getDataForEmployee() {
  console.log(this.EmployeeID);
  this.motiv8Service.getDataForLoggedUser(this.EmployeeID).subscribe(res => {
    this.sharedEmployee = res;
    this.eventsSubject.next(this.sharedEmployee);
    console.log(this.sharedEmployee);
  });
}

getDataForMe() {
  this.sharedEmployee = this.currentUserInfo;
  this.eventsSubject.next(this.sharedEmployee);
  console.log('za mene ciljevi', this.sharedEmployee);
}

  ngOnInit() {
    this.getLoggedNow();
  }

}
