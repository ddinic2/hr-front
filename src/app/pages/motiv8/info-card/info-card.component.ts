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
  currentYear: any;

  @Input() loggedUser: any;


  constructor( private motiv8Service: Motiv8Service , public loginService: LoginService) {
    this.currentYear = new Date().getFullYear();
}



  getUserDataAndId() {
    this.loginService.getLoggedInUser().subscribe(res => {
      this.currentUser = res;
    });

      }

  getCurrentUser() {
   this.motiv8Service.getDataForLoggedUser(this.currentUser.data.employeeId, this.currentYear);
    this.motiv8Service.getDataForLoggedUser(this.currentUser.data.employeeId, this.currentYear).subscribe(res => {
      this.loggedUserInfo = res;
    });
  }

  ngOnInit() {
   this.getUserDataAndId();
   this.getCurrentUser();
  }

}
