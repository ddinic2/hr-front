import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/shared/login.service';

@Component({
  selector: 'hr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hr-odsustva';
  userRole: number;



  constructor(private login: LoginService) {}

  ngOnInit() {
    }
    // this.login.getLoggedInUser().subscribe(user => {
    //   this.userRole = user.data.roleId;
    //   console.log('dohvacen user', user);
    //   console.log('dohvacena rola', this.userRole);
    // });
  }


