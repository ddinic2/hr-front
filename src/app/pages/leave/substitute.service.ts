import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import * as _moment from 'moment';
import business from 'moment-business';
import * as _moment1 from 'moment-weekday-calc';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { Employee } from 'src/app/models/employee';
import { AbsenceSickLeaveType } from 'src/app/models/absence-sick-leave-type';
import { zip } from 'rxjs/operators';
import { AbsenceSubtype } from 'src/app/models/absence-subtype';
import { SickLeaveCode } from 'src/app/models/sick-leave-code';
import { AbsenceType } from 'src/app/models/absence-type';


const moment = _moment;


@Injectable({
  providedIn: 'root'
})
export class SubstituteService {
  data;
  public retPostData;
  dateFormat = 'YYYY-MM-DD';
  substitutesList = new BehaviorSubject<any>([]);
  holidayDateslist = [];//['Wed Oct 3 2018', 'Fri Oct 12 2018', 'Mon Oct 15 2018', 'Wed Oct 17 2018', 'Fri Oct 19 2018'];
  holidayObservable: Observable<string[]>;
  canSave = false;

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
    this.holidayObservable = this.getHolidayDays();
    this.holidayObservable.subscribe(res => {
      this.holidayDateslist = res;
      this.canSave = true;
    });
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

  getHolidayDays = () => {
    const url = environment.db.ROOT + environment.db.HOLIDAY_DAYS;
    return this.http.get<string[]>(url);
  }

  getAbsenceSickLeaveType = () => {
    const url = environment.db.ROOT + environment.db.ABSENCE_SICK_LEAVE_TYPE;
    return this.http.get<AbsenceSickLeaveType[]>(url);
  }

  getAbsenceSubtype = () => {
    const url = environment.db.ROOT + environment.db.ABSENCE_SUBTYPE;
    return this.http.get<AbsenceSubtype[]>(url);
  }

  getSickLeaveCode = () => {
    const url = environment.db.ROOT + environment.db.SICK_LEAVE_CODE;
    return this.http.get<SickLeaveCode[]>(url);
  }
  getAbsenceType = () => {
    const url = environment.db.ROOT + environment.db.ABSENCE_TYPE;
    return this.http.get<AbsenceType[]>(url);
  }

  getSubstitutesByDate = (dateFrom: Date, dateTo: Date) => {
    const startDate = moment(dateFrom);
    const endDate = moment(dateTo);


    const obj = {
      params: new HttpParams()
        .set('DateFrom', startDate.format(this.dateFormat))
        .set('DateTo', endDate.format(this.dateFormat))
    };
    const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.EMPLOYEE_SUBSITUTE;
    console.log(obj);
    return this.http.get<Employee[]>(url, obj);
    // .subscribe(res => this.substitutesList.next(res));
  }

  public postAbsence(employeeAbsence: EmployeeAbsence) {

    const url = environment.db.ROOT + environment.db.ABSCENCE;
    const startDate = moment(employeeAbsence.fromDate);
    const endDate = moment(employeeAbsence.toDate);

    const dateArray = this.getDateArray(startDate, endDate);


    this.holidayDateslist.forEach(function (item) {
      const index = dateArray.indexOf(item.Date);
      if (index !== -1) {
        dateArray.splice(index, 1);
      }
      employeeAbsence.numOfdays = dateArray.length;
    });

    this.http.post(url, employeeAbsence ).subscribe(data => {
      this.retPostData = data;
    });
  }

  getDateArray = function (start, end) {
    const dateArray = new Array();
    const startDate = new Date(start);
    while (startDate <= end) {
      if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
        dateArray.push(new Date(startDate).toISOString().substring(0, 10));
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    return dateArray;
  };

}
