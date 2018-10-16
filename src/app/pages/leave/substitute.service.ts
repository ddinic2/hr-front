import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _moment from 'moment';
import business from 'moment-business';
import * as _moment1 from 'moment-weekday-calc';
import { EmployeeAbsence } from 'src/app/models/employee-absence';


const moment = _moment;


@Injectable({
  providedIn: 'root'
})
export class SubstituteService {
  data;
  public retPostData;
  dateFormat = 'YYYY-MM-DD';
  substitutesList = new BehaviorSubject<any>([]);

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

  // getSubList = (subList) => {
  //   return this.getSubstitutesByDate(undefined, undefined).subscribe(res => subList.next(res));
  // }

  getRelevantSubstitutes = () => {
    return this.substitutesList;
  }
  
  // getHolidayDays = () => {
  //   const url = environment.db.ROOT + environment.db.HOLIDAYDAYS;
  //   return this.http.get<any>(url);
  // }

  getSubstitutesByDate = (dateFrom: Date, dateTo: Date) => {
    const startDate = moment(dateFrom);
    const endDate = moment(dateTo);

    const obj = {
      params: new HttpParams()
        .set('DateFrom', startDate.format(this.dateFormat))
        .set('DateTo', endDate.format(this.dateFormat))
    };
    const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.EMPLOYEESUBSITUTE;
    console.log(obj);
    return this.http.get<any>(url, obj).subscribe(res => this.substitutesList.next(res));
  }

  public postAbsence(employeeAbsence: EmployeeAbsence) {
    const url = environment.db.ROOT + environment.db.ABSCENCE;

    const startDate = moment(employeeAbsence.fromDate);
    const endDate = moment(employeeAbsence.toDate);

    const dateArray  =  this.getDateArray(startDate, endDate);
    const hoildayDateslist  = ['Wed Oct 3 2018', 'Fri Oct 12 2018', 'Mon Oct 15 2018', 'Wed Oct 17 2018', 'Fri Oct 19 2018'];

      hoildayDateslist.forEach(function(item) {
        const index = dateArray.indexOf(item);
        if (index !== -1) {
          dateArray.splice(index, 1);
        }

       });
       const numOfADys =  dateArray.length;
       console.log('Praznici: ', dateArray);
       console.log(numOfADys);


    // const obj = {
    //   EmployeeId: 2,
    //   EmployeeName: options['FirstName'],
    //   DateFrom: fromDate,
    //   DateTo: toDate,
    //   HRAbsenceType: 1,
    //   HRAbsenceTypeName: 'Godišnji odmor',
    //   HRJobTypePosition: null,
    //   HRProcesStatus: 0,
    //   HREmployeeAbsence: null,
    //   NumOfdays: 2,
    //   HRAbsenceProcessStatus: 1,
    //   EmployeeEmail: 'bojan.bozic@timsystems.rs'
    // };

    this.http.post(url, employeeAbsence).subscribe(data => {
      this.retPostData = data;
    });
  }

   getDateArray = function(start, end) {
    const dateArray = new Array();
    const startDate = new Date(start);
    while (startDate <= end) {
      if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
        dateArray.push(new Date(startDate).toString().substring(0, 15));
            }
        startDate.setDate(startDate.getDate() + 1);
    }
        return dateArray;
  };

}
