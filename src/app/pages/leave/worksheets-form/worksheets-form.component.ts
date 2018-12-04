import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceType } from 'src/app/models/absence-type';
import { LoginService } from 'src/app/shared/shared/login.service';
import { Worksheets } from 'src/app/models/worksheets';
import { EmployeePresenceList } from 'src/app/models/employee-presence-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatSnackBar} from '@angular/material';
import { WorksheetsPresenceStatus } from 'src/app/models/enums/worksheets-prsence-status';
import { SlicePipe } from '@angular/common';
import { AbsenceTypes } from 'src/app/models/enums/absence-type';
import { DayStatus } from 'src/app/models/day-status';
import { isNgTemplate } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';
import * as _moment from 'moment';
import * as lodash from 'lodash';
import { Roles } from 'src/app/models/enums/role';

const _ = lodash;


@Component({
  selector: 'hr-worksheets-form',
  templateUrl: './worksheets-form.component.html',
  styleUrls: ['./worksheets-form.component.scss']
})
export class WorksheetsFormComponent implements OnInit {
  public retPostData;
  worksheetsForm: FormGroup;
  worksheetsMonthsOptions: number[] = [];
  worksheetsYearsOptions: number[] = [];
  orgUnitOptions: any;
  dateList: number[] = [];
  absenceTypeOptions: AbsenceType[] = [];
  presenceDetailTypeOptions: any;
  loggedUser: any;
  employeePresenceList: any;
  comparePresenceList: any;
  loginUserId: number;
  presenceListStatus: any;
  checkedRes: boolean;
  registratorOptions: any;
  message: string;
  roleId: string;
  loggedId: string;
  rolaHRManager = Roles.HRManager.toString();
  rolaRecord = Roles.Record.toString();
  lockWorksheet: boolean;



@ViewChildren('inputs') inputs;

  constructor(private _fromBuilder: FormBuilder,
     public subService: SubstituteService,
      public loginService: LoginService,
       public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    this.worksheetsForm = this._fromBuilder.group({
      orgUnit: [''],
      year: [''],
      month: [''],
      absenceTypeControl: [''],
      registrator: [''],
      i : ['']
    });

  }

  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedInUser();
    this.roleId = this.loggedUser.value.data.roleId;
    this.loggedId = this.loggedUser.value.data.employeeId;
    this.subService.getOrgUnit(this.roleId, this.loggedId).subscribe(res => { this.orgUnitOptions = res; });
    this.subService.getWorksheetsYears().subscribe(res => { this.worksheetsYearsOptions = res; });
    this.subService.getWorksheetsMonths().subscribe(res => { this.worksheetsMonthsOptions = res; });
    this.subService.getAbsenceTypeWorksheets().subscribe(res => {
    this.absenceTypeOptions = res;
      //this.absenceTypeOptions.push({ hrAbsenceTypeID: 0, name: '' })
    });
    this.subService.getPresenceDetailType().subscribe(res => { this.presenceDetailTypeOptions = res; });



    // this.worksheetsForm.get('month').setValue(1);
    // this.worksheetsForm.get('year').setValue(2018);

    //Kada izabere godinu da napuni evidentičare
    // this.worksheetsForm.controls['year'].valueChanges.subscribe(value => {
    //   if (value && this.worksheetsForm.controls['month'].value) {
    //     this.subService.getRegistratorByDate(this.worksheetsForm.controls['month'].value, value).subscribe((result) => {
    //       this.registratorOptions = result;
    //     });
    //   }
    // });

  }

  detailsPresence() {
    const formResult = this.worksheetsForm.value;
    this.subService.getEmployeePresenceList(formResult, this.loggedUser.value.data.employeeId)
      .subscribe(res => {
      res.map(item => item.DayStatus = item.DayStatus.map(element => {
        return DayStatus.fromCode(element);
      }));
       this.employeePresenceList = res;
      //   const result = this.employeePresenceList.map(m => {
      //       // m.DayStatus
      //       return DayStatus.fromCode(m.DayStatus);
      //   });

      const month = (this.worksheetsForm.controls['month'].value).toString();
      const year = (this.worksheetsForm.controls['year'].value).toString();
      const daysInMonth = _moment(year + month, 'YYYY-MM').daysInMonth();
      this.dateList = this.dateArrayListDetails(daysInMonth);
        if (this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Lock
          || this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Verefacition) {
          this.lockWorksheet = true;
        }
      });
  }

  getDaysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getFullYear(), anyDateInMonth.getMonth() + 1, 0).getDate();
  }

  dateArrayListDetails = function (dates) {
    this.dateList.length = 0;
    for (let i = 1; i <= dates; i++) {
      this.dateList.push(i);
    }
    return this.dateList;
  };

  compareWorksheets() {
    const formResult = this.worksheetsForm.value;
    this.subService.compareWorksheetsByRegistrator(formResult, this.loggedUser.value.data.employeeId)
      .subscribe(res => {
      this.comparePresenceList = res;
        const result = this.comparePresenceList.map(m => m.PresenceTypeCode);
        this.dateList = this.dateArrayListDetails(result[0].length);
      });
  }

  lockWorksheets() {
    if (this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Lock
       || this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Verefacition) {
      this.snackBar.open('Lista je već zaključana', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
      });
    } else {
    this.employeePresenceList.loginUserId = this.loggedUser.value.data.employeeId;
    this.employeePresenceList.presenceListStatus = WorksheetsPresenceStatus.Lock;
    const empPresenceList: EmployeePresenceList = this.employeePresenceList;
    const employeePresenceListID = this.employeePresenceList[0].EmployeePresenceListID;

    const dialogRef = this.dialog.open(DialogOverviewWorksheets, {
        width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Lock;
          this.subService.lockWorksheets(empPresenceList, employeePresenceListID);
        }
        this.lockWorksheet = true;
      });

    }


  }

  unlockWorksheets() {
    const formResult = this.worksheetsForm.value;
    this.subService.unlockWorksheetsByManager(formResult, this.loggedUser.value.data.employeeId).subscribe(res => {
      this.retPostData = res;
      this.snackBar.open(this.retPostData, 'OK', {
        duration: 10000,
        verticalPosition: 'top'
      });

    });

  }



  selectedItem = (item, index, event) => {
      item.DayStatus[index] = event.value;
  }

  focusInput( colIdx: number, item: any) {
    // convert ViewChildren querylist to an array to access by index
    const inputEls = this.inputs.toArray();
    // get the flat index from row/cols
    const flatIdx = (colIdx + 1);
    // get that reference from the input array and use the native element focus() method
    inputEls[flatIdx].nativeElement.focus();
  }

  shiftFocusRight(colIdx: number, item: any) {
       this.focusInput(colIdx, item);
  }

  onKey = (item,  index, event, rowIdx) => {

    item.set(event.key);
    //this.shiftFocusRight(index, item);
     // shiftFocusRight(colIdx:number, item:any) {
  //      this.focusInput(colIdx, item);

  }


  saveWorksheets = () => {
   const presenceListCopy = _.cloneDeep(this.employeePresenceList);
  for (let i = 0; i < presenceListCopy.length; i++) {
    const item = presenceListCopy[i];
          for (let ii = 0; ii < item.DayStatus.length; ii++) {
            const dayStatus = presenceListCopy[i].DayStatus[ii].value;
            presenceListCopy[i].DayStatus[ii] = dayStatus;
      }
   }
    this.loginUserId = this.loggedUser.value.data.employeeId;
    presenceListCopy.loginUserId = this.loggedUser.value.data.employeeId;

    const empPresenceList: EmployeePresenceList = presenceListCopy;
    empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Created;
    this.subService.putWorksheets(empPresenceList);
    //this.subService.checkedPresenceStatus(empPresenceList);
    // if (empPresenceList.lockPresenceList) {

    //   const dialogRef = this.dialog.open(DialogOverviewWorksheets, {
    //     width: '250px'
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Lock;
    //       this.subService.putWorksheets(empPresenceList);

    //     }

    //   });
    // }
    // else {
    //   empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Created;
    //   this.subService.putWorksheets(empPresenceList);
    // }

  }

}

@Component({
  selector: 'dialog-overview-worksheets',
  templateUrl: 'dialog-overview-worksheets.html',
})
export class DialogOverviewWorksheets {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewWorksheets>) { }

  onClick = (data) => {
    this.dialogRef.close(data);
  }

}

