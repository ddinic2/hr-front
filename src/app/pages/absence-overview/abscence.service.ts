import { environment } from './../../../environments/environment';
import { Observable, from, } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TimsGridComponent } from 'timsystems-lib';
import { tap } from 'rxjs/operators';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { LoggedUser } from 'src/app/models/logged-user';
import { PARAMETERS } from '@angular/core/src/util/decorators';




@Injectable({
  providedIn: 'root'
})
export class AbscenceService {
  abscences: Observable<any>;

  constructor(private http: HttpClient) {}

  getAbscences = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number,
    absenceType: number,
    loggedEmployeeId: string,
    roleId: string
  ) => {
    let URL = environment.db.ROOT + environment.db.ABSCENCE + '?';
    URL += `page=${page + 1}&count=${count > 0 ? count : 20}`;
    if (status) {
      URL += `&status=${status}`;
    }

    if (order) {
      URL += `&order=${order}`;
      URL += direction ? `&dir=${direction}` : ``;
    }

    if (absenceType) {
      URL += `&absenceType=${absenceType}`;
    }
    if (loggedEmployeeId) {
      URL += `&loggedEmployeeId=${loggedEmployeeId}`;
    }
    if (roleId) {
      URL += `&roleId=${roleId}`;
    }
    console.log('URL: ', URL);
    return this.http.get(URL);

  }

  editAbsence = (item: EmployeeAbsence) => {
    const url = environment.db.ROOT + environment.db.ABSCENCE;
    return this.http.put(url, item);
  }

  removeAbsence = (absenceId: number) => {

    const obj = { params: new HttpParams().set('absenceId', '' + absenceId)};
    const url = environment.db.ROOT + environment.db.ABSCENCE;

    return this.http.delete(url, obj);
  }



  changeAbsenceStatus = (item: EmployeeAbsence) => {
   const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.CHANGE_ABSENCE_STATUS;
      return this.http.post(url, item);
  }

  changeAbsenceStatusFromMail = (employeeId: string, employeeAbsence: string, exceptionAbsence: string, numOfDays: string,
    absenceProcessStatusNew: string, absenceType: string, loggedUserEmail: string,
     loggedUserRoleId: string, loggedEmployeeId: string, loggedUserId: string) => {
    const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.CHANGE_ABSENCE_STATUS;
   const  obj = {employeeId, employeeAbsence, exceptionAbsence, numOfDays, absenceProcessStatusNew, absenceType,
     loggedUserEmail, loggedUserRoleId, loggedEmployeeId, loggedUserId };
       return this.http.post(url, obj);
   }


  // generateDocument = (employeeAbsence: number, employeeId: number, absenceType: number ) => {
  //   const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.GENERATE_DOCUMENT;
  //   const obj = {employeeAbsence, employeeId, absenceType };
  //     return this.http.post(url, obj, {
  //       responseType: 'blob',
  //       observe: 'response',
  //     }).pipe(tap(response => console.log(response)));

  //   }


  generateDocument = (employeeAbsence: number, employeeId: number, absenceType: number, absenceProcessStatus: number,
    loggedEmployeeId: number, loggedUserEmail: string,
     loggedUserRoleId: number, absenceProcessStatusNew: number, loggedUserId: number ) => {
    const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.GENERATE_DOCUMENT;
    const obj = {employeeAbsence, employeeId, absenceType, absenceProcessStatus,
      loggedEmployeeId, loggedUserEmail, loggedUserRoleId, absenceProcessStatusNew, loggedUserId };
      return this.http.post(url, obj, {
        responseType: 'blob',
        observe: 'response',
      }).pipe(tap(response => console.log(response)));

    }

    getDocument = (employeeAbsence: number, employeeId: number) => {
      const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.GET_GENERATE_DOCUMENT;
      const obj = {employeeAbsence, employeeId};
      return this.http.post(url, obj, {
        responseType: 'blob',
        observe: 'response',
      }).pipe(tap(response => console.log(response)));
    }

    getYearVacation = (loggedEmployeeId: string) => {
      let URL = environment.db.ROOT + environment.db.ABSCENCE + environment.db.YEAR_VACATION + '?';
      if (loggedEmployeeId) {
        URL += `loggedEmployeeId=${loggedEmployeeId}`;
      }
      console.log("URL getYear: ", URL);
      return this.http.get(URL);

    }

}

