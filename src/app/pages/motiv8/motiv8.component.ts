import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/shared/login.service';
import { Motiv8Service } from 'src/app/pages/motiv8/motiv8.service';
import { LoggedUserInfo } from 'src/app/models/logged-user-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'hr-motiv8',
  templateUrl: './motiv8.component.html',
  styleUrls: ['./motiv8.component.scss']
})
export class Motiv8Component implements OnInit {

  constructor(private loginService: LoginService, private motiv8Service: Motiv8Service) { }
  currentUser: any;
  // loggedUserInfo: LoggedUserInfo;
  // loggedUserInfoObs: Observable<LoggedUserInfo>;
getLoggedNow() {
  this.loginService.getLoggedInUser().subscribe(res => {
    this.currentUser = res.data.employeeId;
  });
}

//  getInfoLine() {
//    this.loggedUserInfoObs = this.motiv8Service.getDataForLoggedUser(this.currentUser);
//    this.motiv8Service.getDataForLoggedUser(this.currentUser).subscribe(res => {
//      this.loggedUserInfo = res;
//      console.log('Podaci novi o zaposlenom', this.loggedUserInfo);
//    });
//  }

  ngOnInit() {
    this.getLoggedNow();
    // this.getInfoLine();
  }

}
