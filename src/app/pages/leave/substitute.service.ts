import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
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
import {MatSnackBar} from '@angular/material';
import { EmployeePresenceList } from 'src/app/models/employee-presence-list';
import { Headers, RequestOptions } from '@angular/http';
import { keyframes } from '@angular/animations';
import { TouchSequence } from 'selenium-webdriver';


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
  checkedRes = [];
 
  extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }


  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
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
  getAbsenceTypeWorksheets = () => {
    const url = environment.db.ROOT + environment.db.ABSENCE_TYPE + environment.db.ABSENCE_TYPE_WORKSHEETS;
    return this.http.get<AbsenceType[]>(url);
  }
  
  getEmployee = () => {
    const url = environment.db.ROOT + environment.db.EMPLOYEE;
    return this.http.get<Employee[]>(url);
  }

  getWorksheetsMonths = () => {
    const url = environment.db.ROOT + environment.db.WORKSHEETS + environment.db.WORKSHEETS_MONTH;
    return this.http.get<number[]>(url);
  }
  getWorksheetsYears = () => {
    const url = environment.db.ROOT + environment.db.WORKSHEETS + environment.db.WORKSHEETS_YEAR;
    return this.http.get<number[]>(url);
  }
  
  getPresenceDetailType = () => {
    const url = environment.db.ROOT + environment.db.WORKSHEETS + environment.db.PRESENCE_DETAIL_TYPE;
    return this.http.get<number[]>(url);
  }
  
  getOrgUnit = () => {
    const url = environment.db.ROOT + environment.db.ORG_UNIT;
    return this.http.get<any[]>(url);
  }

  getEmployeePresenceList = (formResult, employeeId: number ) => {
    const obj = {
      params: new HttpParams()
      .set('Month', formResult.month.toString())
      .set('Year', formResult.year.toString())
      .set('OrgUnitId', formResult.orgUnit.OrgUnitId.toString())
      .set('EmployeeId', employeeId.toString())
    };
    const url = environment.db.ROOT + environment.db.WORKSHEETS;
    return this.http.get<any[]>(url, obj);
  }

  checkedPresenceStatus = (empPresenceList: any) => {
    let result = empPresenceList.map(m => m.DayStatus);
    for(var i = 0; i < result.length; i++)
    {
      for(var ii = 0; ii < result[i].length; ii++)
      {
        let res = result[i];
        if(res[ii] == null)
        {
            this.checkedRes.push(1);
        }
      }
    }
    
  if(this.checkedRes.length == 0)// postavi da je jednako 0 to znači da su sve liste popunjene
    {
      empPresenceList.lockPresenceList = true;
    }
  }
    
  getRegistratorByDate = (month: number, year: number) => {
    const obj = {
      params: new HttpParams()
      .set('Month', month.toString())
      .set('Year', year.toString())
    }
      const url = environment.db.ROOT + environment.db.WORKSHEETS + environment.db.PRESENCE_REGISTRATOR;
      return this.http.get(url, obj);
  }

  compareWorksheetsByRegistrator = (data: any, loginUserId: number) => {
    const obj = {
      params: new HttpParams()
      .set('RegistratorId', data.registrator.toString())
      .set('Month', data.month.toString())
      .set('Year', data.year.toString())
      .set('LoginUser', loginUserId.toString())
     
    };
      const url = environment.db.ROOT + environment.db.WORKSHEETS + environment.db.COMPARE_WORKSHEETS;
      return this.http.get(url, obj);
  }

  unlockWorksheetsByManager = (data: any, loginUserId: number) => {
    const obj = {
      params: new HttpParams()
      .set('Month', data.month.toString())
      .set('Year', data.year.toString())
      .set('LoginUser', loginUserId.toString())
      .set('OrgUnit', data.orgUnit.OrgUnitId.toString())
    };
      const url = environment.db.ROOT + environment.db.WORKSHEETS + environment.db.UNLOCK_WORKSHEETS;
      return this.http.get(url, obj);
  }

  getSubstitutesByDate = (dateFrom: Date, dateTo: Date, employeeId: number, absenceType: any) => {
    const startDate = moment(dateFrom);
    const endDate = moment(dateTo);

    const obj = {
      params: new HttpParams()
        .set('DateFrom', startDate.format(this.dateFormat))
        .set('DateTo', endDate.format(this.dateFormat))
        .set('EmployeeId', employeeId.toString())
        .set('AbsenceType', absenceType.toString())
    };
    const url = environment.db.ROOT + environment.db.ABSCENCE + environment.db.EMPLOYEE_SUBSITUTE;
    console.log(obj);
    return this.http.get<Employee[]>(url, obj);
    // .subscribe(res => this.substitutesList.next(res));
  }

  public postAbsence(employeeAbsence: EmployeeAbsence): Observable<EmployeeAbsence> {  
    const url = environment.db.ROOT + environment.db.ABSCENCE;
    const startDate = moment(employeeAbsence.fromDate);
    const endDate = moment(employeeAbsence.toDate);
    const dateNow =  new  Date().toDateString().substring(0,15);
    
    const dateException = this.getExceptionDate(startDate);
    dateException.forEach(function (item) {
      const index = dateNow.indexOf(item);
      if(index !== -1) {
        employeeAbsence.exceptionAbsence = true;
      }

    });
 

    const dateArray = this.getDateArray(startDate, endDate);
    this.holidayDateslist.forEach(function (item) {
      const index = dateArray.indexOf(item.Date);
      if (index !== -1) {
        dateArray.splice(index, 1);
      }
      employeeAbsence.numOfdays = dateArray.length;
    });

     return this.http.post<EmployeeAbsence>(url, employeeAbsence);
    //  .subscribe(data => {
    //   this.retPostData = data;
    //   this.snackBar.open(this.retPostData, 'OK', {
    //     duration: 5000,
    //   });
    // });
  }

  getDateArray = function (start, end) {
    const dateArray = new Array();
    const startDate = new Date(start);
    while (startDate <= end) {
      if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
        dateArray.push(new Date(startDate).toDateString().substring(0, 15));
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    return dateArray;
  };

  getExceptionDate = function(start) {
    var i = 0;
    const dateExArray = new Array();
    const startDate = new Date(start)
    
      dateExArray.push(new Date(startDate).toDateString().substring(0, 15));
      startDate.setDate(startDate.getDate() - 1);
      while(dateExArray.length <= 2){
        if(startDate.getDay() !== 0 && startDate.getDay() !== 6){
          dateExArray.push(new Date(startDate).toDateString().substring(0, 15));
        }
        startDate.setDate(startDate.getDate() - 1);
      }
      
    return dateExArray;
    
  };

  putWorksheets(employeePresenceList: EmployeePresenceList) {
      const url = environment.db.ROOT + environment.db.WORKSHEETS;
      const obj = { 
        params: new HttpParams() 
        .set('LoginUserId', employeePresenceList.loginUserId.toString())
        .set('PresenceListStausId', employeePresenceList.presenceListStatus.toString())
      };

      this.http.put(url, employeePresenceList, obj).subscribe(data => {
        this.retPostData = data;
        this.snackBar.open(this.retPostData, 'OK', {
          duration: 10000,
          verticalPosition: 'top'
        });
      });
  }

  

}
