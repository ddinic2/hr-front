import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from 'src/app/models/employee';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUser;
  loggedUser = new  BehaviorSubject<any>(this.loggedInUser);


  constructor(private http: HttpClient, private router: Router) {
  }

  loggedIn = (): Promise<boolean> | Observable<boolean> => {
    if (!this.loggedInUser) {

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let smth = localStorage.getItem('loggedUserEmployee');
          console.log('Objekat iz loginServisa: ' + JSON.stringify(smth));
          this.loggedInUser = JSON.parse(smth);
          this.loggedUser.next(this.loggedInUser);
          const val = this.loggedInUser != null;
          resolve(val);
        }, 1000);
      });
    } else {
      return of(this.loggedInUser != null);
    }
  }

 getLoggedInUser = () => {
return this.loggedUser;
 }

}

