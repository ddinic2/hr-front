import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class SubstituteService {
  data;
  public retPostData;
  dateFormat = 'YYYY-MM-DD';

  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  handleErrorObservable(error: Response | any) {
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

  getSubstitutesByDate = (dateFrom: Date, dateTo: Date): Observable<any[]> => {
    const startDate = moment(dateFrom);
    const endDate = moment(dateTo);

    const obj = {
      params: new HttpParams()
        .set('DateFrom', startDate.format(this.dateFormat))
        .set('DateTo', endDate.format(this.dateFormat))
    };
    const url =
      environment.db.ROOT +
      environment.db.ABSCENCE +
      environment.db.EMPLOYEESUBSITUTE;
    console.log(obj);
    return this.http.get<any>(url, obj);
  }

  public postAbsence(fromDate: Date, toDate: Date) {
    const url = environment.db.ROOT + environment.db.ABSCENCE;
    const obj = {
      EmployeeId: 2,
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
      EmployeeEmail: 'bojan.bozic@timsystems.rs'
    };

    this.http.post(url, obj).subscribe(data => {
      this.retPostData = data;
    });
  }
}
