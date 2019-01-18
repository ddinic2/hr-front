import { Injectable } from '@angular/core';
import { CurrentUser } from 'src/app/models/current-user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  currentUser: CurrentUser;
  tempUser: any;

  constructor() { }

  current = [{
    Id: 1,
    UserName: 'ddinic2',
    Password: 'ddinic2'
  }];

  sharedUser: BehaviorSubject<any> = new BehaviorSubject('');
  currentSharedUser = this.sharedUser.asObservable();

  checkLogIn(user: CurrentUser) {
    for (let i = 0; i < this.current.length; i++) {
      if (this.current[i].UserName === user.UserName
        && this.current[i].Password === user.Password) {

          this.tempUser = this.current[i];
          this.sharedUser.next({ '':  this.current[i] });
          return new BehaviorSubject('ok');
          // this.currentUs.emit(this.currentUser);
          // this.location.go('home');
      } else {
        return new BehaviorSubject('denny');
      }
    }
  }
}
