import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LogInService } from './log-in.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'hr-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: LogInService, private router: Router,
    private location: Location,
    public snackBar: MatSnackBar) { }

    // @Output() currentUs = new EventEmitter<string>();

    logginSucces: any;
    currentUser: any;

    logInForm = this.fb.group({
      UserName: [''],
      Password: ['']
  });

  addTaskForm = this.fb.group({
    content: ['']
  });
  message: string;
  resSub: any;

  // getCurrentUser() {
  //   this.currentUser = this.loginService.current;
  //   console.log(this.currentUser);
  // }



  signIn() {
    if (this.logInForm.valid) {

      this.loginService.checkLogIn(this.logInForm.value).subscribe(res => {
        if (res === 'ok') {
          this.logInForm.reset();
          this.logginSucces = false;
          this.router.navigateByUrl('home');
        } else {
         this.snackBar.open('Pogresna lozinka ili korisnicko ime.', 'OK', {
            duration: 4000
          });
          return;
        }
      });

      // for (let i = 0; i < this.loginService.current.length; i++) {
      //   if (this.loginService.current[i].UserName === this.logInForm.value.UserName
      //     && this.loginService.current[i].Password === this.logInForm.value.Password) {
      //       this.logginSucces = false;
      //       this.logInForm.reset();
      //       this.currentUser = this.loginService.current[i];
      //       this.currentUs.emit(this.currentUser);
      //       this.location.go('home');
      //   } else {
      //     this.snackBar.open('Pogresna lozinka ili korisnicko ime.', 'OK', {
      //       duration: 4000
      //     });
      //     return;
      //   }
      // }
    } else {
      this.snackBar.open('Niste popunili sva polja ispravno.', 'OK', {
        duration: 4000
      });
      return;
    }
  }

  ngOnInit() {
    this.logginSucces = true;
    this.loginService.currentSharedUser.subscribe(message => console.log('poruka prosledjena', message));
  }

}
