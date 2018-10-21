import { environment } from './../../../environments/environment';
import { Observable, from, } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
    absenceType: number
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
    console.log("URL: ", URL);
    return this.http.get(URL);
    
  };

  changeAbsenceStatus = (employeeAbsence: number, absenceProcessStatus: number) => {
      const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.CHANGE_ABSENCE_STATUS;
      const obj = {employeeAbsence, absenceProcessStatus}
      return this.http.post(url, obj);
  };

   
    
}

