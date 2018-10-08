import { toDate } from '@angular/common/src/i18n/format_date';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver/safari';
import { PARAMETERS } from '@angular/core/src/util/decorators';


@Injectable({
  providedIn: 'root'
})
export class SubstituteService {
  data;
  public retPostData;

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }


   constructor(private http: HttpClient) {
    // this.getSubstitutes('');
   }


  // getSubstitutes(val: string): Observable<any[]> {
  //   const options = {params: new HttpParams().set('', val)};
  //   return this.http.get<any[]>(
  //     environment.db.ROOT  + environment.db.EMPLOYEESUBSITUTE,
  //     options
  //   );
  // }


   getSubstitutesByDate(dateFrom: string, dateTo: string): Observable<any[]> {
   const obj = { params: new HttpParams().set('DateFrom', dateFrom).set('DateTo', dateTo)};
    const url = environment.db.ROOT  + environment.db.ABSCENCE + environment.db.EMPLOYEESUBSITUTE;
    console.log(obj);
    return this.http.get<any>(url, obj);

  }


 public postAbsence(fromDate: Date, toDate: Date) {
   const url = environment.db.ROOT + environment.db.ABSCENCE;
   const obj = {EmployeeId: 2,
    EmployeeName: null,
    DateFrom: fromDate,
    DateTo: toDate,
    HRAbsenceType: 1,
    HRAbsenceTypeName: 'Godišnji odmor',
    HRJobTypePosition: null,
    HRProcesStatus: 0,
    HREmployeeAbsence: null,
    NumOfdays: 2,
    HRAbsenceProcessStatus: 1,
    EmployeeEmail: 'bojan.bozic@timsystems.rs'};

   this.http.post(url, obj).subscribe
   (data => {this.retPostData = data;
     });
 }



}
