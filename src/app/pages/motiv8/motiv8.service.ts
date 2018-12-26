import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError , BehaviorSubject, of, from } from 'rxjs';
import { Test, Status, CategoryOfTask, WhatRequest, WhatHalf, WhatYearly,
  LoggedUserInfo, How, TotalYearly, Potential, DevelopmentPlan } from 'src/app/models/logged-user-info';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment.prod';
import { EmployeeMotiv8 } from 'src/app/models/employee';
import { ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class Motiv8Service {

obj: any;

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

  getDataForLoggedUser(id: number, year: number): Observable<LoggedUserInfo> {
    const url = environment.db.ROOT2 + 'motiv8/survey-employee?employeeID=' + id + '&year=' + year;
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

  confirmeEmployeeHalf(task: WhatHalf): Observable<WhatHalf> {
    const url =  environment.db.ROOT2 + 'motiv8/survey-target-eval-hy-approve-employee';
    return this.http.put<WhatHalf>(url, task);
  }

  confirmeManagerHalf(task: WhatHalf): Observable<WhatHalf> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-eval-hy-approve-manager';
    return this.http.put<WhatHalf>(url, task);
  }

  approveEmployeeYearly(task: WhatYearly): Observable<WhatYearly> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-eval-fy-approve-employee';
    return this.http.put<WhatYearly>(url, task);
  }

  approveManagerYearly(task: WhatYearly): Observable<WhatYearly> {
    const url = environment.db.ROOT2 + 'motiv8/survey-target-eval-fy-approve-manager';
    return this.http.put<WhatYearly>(url, task);
  }

  getListOfHow(id): Observable<How> {
    const url = environment.db.ROOT2 + 'motiv8/survey-answer-behavior-marks?surveyAnswerID=' + id;
    return this.http.get<How>(url);
  }

  addHowByEmployee(task): Observable<How> {
    const url = environment.db.ROOT2 + 'motiv8/survey-answer-behavior-marks-approve-employee';
    return this.http.put<How>(url, task);
  }

  addHowByManager(task): Observable<How> {
    const url = environment.db.ROOT2 + 'motiv8/survey-answer-behavior-marks-approve-manager';
    return this.http.put<How>(url, task);
  }

  addCommentHalf(task): Observable<any> {
    const url = environment.db.ROOT2 + 'motiv8/survey-eval-hy';
    return this.http.put<any>(url, task);
  }

  getEmployeeByManager(id): Observable<LoggedUserInfo> {
    const url = environment.db.ROOT2 + 'motiv8/survey-sub-employees?employeeID=' + id;
    return this.http.get<LoggedUserInfo>(url);
  }

  getTotalYearly(id: number): Observable<TotalYearly> {
    const url = environment.db.ROOT2 + 'motiv8/survey-answer-total-marks?surveyAnswerID=' + id;
    return this.http.get<TotalYearly>(url);
  }

  getPotentials(): Observable<Potential> {
    const url = environment.db.ROOT2 + 'motiv8/employee-potentials';
    return this.http.get<Potential>(url);
  }

  addTotalYearly(data) {
    const url = environment.db.ROOT2 + 'motiv8//survey-answer-total-marks';
    return this.http.put<TotalYearly>(url, data);
  }

  getAllEmployees(): Observable<EmployeeMotiv8[]> {
    const url = environment.db.ROOT2 + 'employee-data';
    return this.http.get<EmployeeMotiv8[]>(url);
  }

  getDevelopmentPlan(id): Observable<DevelopmentPlan[]> {
    return this.http.get<DevelopmentPlan[]>(environment.db.ROOT2 + 'motiv8/survey-answer-development-plans?surveyAnswerID=' + id);
  }

  addDevelopmentPlanList(data): Observable<DevelopmentPlan[]> {
    return this.http.put<DevelopmentPlan[]>(environment.db.ROOT2 + 'motiv8/survey-answer-development-plans', data);
  }

  addDevelopmentPlan(data): Observable<DevelopmentPlan> {
    return this.http.put<DevelopmentPlan>(environment.db.ROOT2 + 'motiv8/survey-answer-development-plan', data);
  }

  getEmployeeLike(snip): Observable<EmployeeMotiv8[]> {
    return this.http.get<EmployeeMotiv8[]>(environment.db.ROOT2 + 'employee-data?filterName=' + snip);
  }

  deleteDevelopmentPlan(id): Observable<any> {
    return this.http.delete<any>(environment.db.ROOT2 + 'motiv8/survey-answer-development-plan?developmentPlanID=' + id);
  }

  getCommentForHY(id): Observable<any> {
    const url = environment.db.ROOT2 + 'motiv8/survey-eval-hy?surveyID=' + id;
    return this.http.get<any>(url);
  }

  saveAndSendAllTarget(tasks, id): Observable<WhatRequest[]> {
    const url = environment.db.ROOT2 + 'motiv8/survey-targets-finish?surveyID=' + id;
    return this.http.put<WhatRequest[]>(url, tasks);
  }

  downloadDoc = (id) => {
    const url = environment.db.ROOT2 + 'motiv8/survey-print?surveyAnswerID=' + id;
    return this.http.post(url, null,  {
      responseType: 'blob',
      observe: 'response',
    });
  }

}
