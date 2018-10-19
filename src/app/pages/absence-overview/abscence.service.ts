import { environment } from './../../../environments/environment';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AbscenceService {
  abscences: Observable<any>;
  tabIndex: number;
  order: '';
  direction: "asc";
  page = 1;
  count = 20;
  status: 1;
  public retPostData;

  
  absenceType = new  BehaviorSubject(1);//Uvek prvo prikazuje Godišnji odmor
  constructor(private http: HttpClient) {}

    getTabIndex = (tabIndex: number) => {
    switch(tabIndex)
    {
      case tabIndex = 0:
      this.absenceType.next(1);
      break;

      case tabIndex = 1:
      this.absenceType.next(3);
      break;

      case tabIndex = 2:
      this.absenceType.next(4);
      break;

      case tabIndex = 3:
      this.absenceType.next(5);
      break;
    }
    this.getAbscences(
    this.order,
    this.direction,
    this.page,
    this.count,
    this.status,
    this.absenceType.value
    ).subscribe(res => {return this.absenceType}); 

  };

  getAbscences = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number,
    absenceType = this.absenceType.value
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
    return this.http.get(URL);
    
  };

  changeAbsenceStatus = (employeeAbsence: number, absenceProcessStatus: number) => {
      const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.CHANGE_ABSENCE_STATUS;
      const obj = {employeeAbsence, absenceProcessStatus}
      return this.http.post(url, obj).subscribe(res => {
        this.retPostData = res;
      });
      
  };

   
    
}

