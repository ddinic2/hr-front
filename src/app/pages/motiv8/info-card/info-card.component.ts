import { Component, OnInit, Input } from '@angular/core';
import { LoggedUserInfo } from 'src/app/models/logged-user-info';
import { LoginService } from 'src/app/shared/shared/login.service';
import { Motiv8Service } from '../motiv8.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'hr-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  currentUser: any;
  loggedUserInfo: LoggedUserInfo;
  @Input() loggedUser: any;

  constructor( private motiv8Service: Motiv8Service , public loginService: LoginService) {
}
  getUserDataAndId() {
    this.loginService.getLoggedInUser().subscribe(res => {
      this.currentUser = res;
      //  console.log('User iz servisa', this.currentUser);
      // console.log('prosledjen info card', this.loggedUser);
    });

      }

  getCurrentUser() {
   this.motiv8Service.getDataForLoggedUser(this.currentUser.data.employeeId);
    this.motiv8Service.getDataForLoggedUser(this.currentUser.data.employeeId).subscribe(res => {
      this.loggedUserInfo = res;
      //  console.log('Podaci novi iz info line ', this.loggedUserInfo);
    });
  }

  ngOnInit() {
    // this.getLoggedUser();
   this.getUserDataAndId();
   this.getCurrentUser();
  }

}
