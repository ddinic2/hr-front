import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError , BehaviorSubject, of, from } from 'rxjs';
import { Test, Status, CategoryOfTask, WhatRequest, WhatHalf, WhatYearly, LoggedUserInfo, How } from 'src/app/models/logged-user-info';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Motiv8Service {


  constructor(private http: HttpClient ) { }

  getStatuses(): Observable<Test[]> {
    const url = environment.db.ROOT2 + 'motiv8/target-statuses';
    return this.http.get<Test[]>(url);
  }

  getHalfWhatStatus(): Observable<Status[]> {
    const url = environment.db.ROOT2 + 'motiv8/target-eval-statuses';
    return this.http.get<Status[]>(url);
  }

  getTargetCategory(): Observable<CategoryOfTask[]> {
    const url = environment.db.ROOT2 + 'motiv8/target-categories';
    return this.http.get<CategoryOfTask[]>(url);
  }

  getTargetWhat(id): Observable<WhatRequest[]> {
    const url = environment.db.ROOT2 + 'motiv8/survey-targets?surveyID=' + id;
    return this.http.get<WhatRequest[]>(url);
  }

  getTargetWhatHalf(id): Observable<WhatHalf[]> {
    const url = environment.db.ROOT2 + 'motiv8/survey-targets-eval-hy?surveyID=' + id;
    return this.http.get<WhatHalf[]>(url);
  }

  getTargetWhatYearly(id): Observable<WhatYearly[]> {
    const url = environment.db.ROOT2 + 'motiv8/survey-targets-eval-fy?surveyID=' + id;
    return this.http.get<WhatYearly[]>(url);
  }

  deleteWhatRequest(id): Observable <any> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target?targetID=' + id;
    return this.http.delete(url);
  }

  addNewWhatRequest(task: WhatRequest): Observable<WhatRequest> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target';
    return this.http.put<WhatRequest>(url, task)
    .catch((err) => {
      console.log('greska', err);
      return Observable.throw(err);
    })
    ;
  }

  updateWhatTask(task: WhatRequest): Observable<WhatRequest> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target?targetID=' + task.Motiv8TargetID;
    return this.http.put<WhatRequest>(url, task);
  }

  rejectTarget(id: number): Observable<WhatRequest> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-reject?targetID=' + id;
    return this.http.put<WhatRequest>(url, null);
  }

  approveTarget(id: number): Observable<WhatRequest> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-approve?targetID=' + id;
    return this.http.put<WhatRequest>(url, null);
  }

  saveAndSendTarget(task: WhatRequest): Observable<WhatRequest> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-finish';
    return this.http.put<WhatRequest>(url, task);
  }

  getDataForLoggedUser(id: number): Observable<LoggedUserInfo> {
    const url = environment.db.ROOT2 + 'motiv8/survey-employee?employeeID=' + id;
    return this.http.get<LoggedUserInfo>(url);
  }

  addHalfYearTarget(task: WhatHalf): Observable<WhatHalf> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-eval-hy';
    return this.http.put<WhatHalf>(url, task);
  }

  addYearlyTarget(task: WhatYearly): Observable<WhatYearly> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-eval-fy';
    return this.http.put<WhatYearly>(url, task);
  }

}
