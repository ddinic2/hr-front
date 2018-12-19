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
import { PdfPrint } from 'src/app/models/pdf-print';
// import * as jsPDF from 'jspdf-autotable';



declare var jsPDF;


const _ = lodash;
// const pdf = jsPDF;


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
  dateList: string[] = [];
  absenceTypeOptions: AbsenceType[] = [];
  presenceDetailTypeOptions: any;
  loggedUser: any;
  employeePresenceList: any;
  comparePresenceList: any;
  presenceListStatus: any;
  checkedRes: boolean;
  registratorOptions: any;
  message: string;
  roleId: string;
  loggedEmployeeId: string;
  loggedUserId: string;
  rolaHRManager = Roles.HRManager.toString();
  rolaRecord = Roles.Record.toString();
  lockWorksheet: boolean;
  unlockWorksheet: boolean;

  title: string;
  dataKey: string;


@ViewChildren('inputs') inputs;

  constructor(private _fromBuilder: FormBuilder,
     public subService: SubstituteService,
      public loginService: LoginService,
       public dialog: MatDialog,
        public snackBar: MatSnackBar,
        ) {
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
    this.loggedEmployeeId = this.loggedUser.value.data.employeeId;
    this.loggedUserId = this.loggedUser.value.data.employeeId;
    this.subService.getOrgUnit(this.roleId, this.loggedEmployeeId).subscribe(res => { this.orgUnitOptions = res; });
    this.subService.getWorksheetsYears().subscribe(res => { this.worksheetsYearsOptions = res; });
    this.subService.getWorksheetsMonths().subscribe(res => { this.worksheetsMonthsOptions = res; });
    this.subService.getAbsenceTypeWorksheets().subscribe(res => {
    this.absenceTypeOptions = res;

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

    this.lockWorksheet = false;
    this.unlockWorksheet = false;
    const formResult = this.worksheetsForm.value;
    this.subService.getEmployeePresenceList(formResult, this.loggedEmployeeId, this.roleId, this.loggedUserId)
      .subscribe(res => {
      res.map(item => item.DayStatus = item.DayStatus.map(element => {
        return DayStatus.fromCode(element);
      //   res.map(item => item.AbsenceSubtype = item.AbsenceSubtype.map(element => {
      //  return  DayStatus.fromSubtypeCode(element);
      }),
       this.employeePresenceList = res);
      this.dateList = this.employeePresenceList[0].Dates;
      if (this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Lock
        || this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Verefacition) {
        this.lockWorksheet = true;
      } else {
        this.unlockWorksheet = true;
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
    this.subService.compareWorksheetsByRegistrator(formResult, this.loggedEmployeeId, this.loggedUserId)
      .subscribe(res => {
      this.comparePresenceList = res;
        const result = this.comparePresenceList.map(m => m.PresenceTypeCode);
        this.dateList = this.comparePresenceList[0].Dates;
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
    this.employeePresenceList.loggedEmployeeId = this.loggedUser.value.data.employeeId;
    this.employeePresenceList.loggedUserId = this.loggedUser.value.data.userId;
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
          this.lockWorksheet = true;
          this.unlockWorksheet = false;
        }

      });

    }


  }

  unlockWorksheets() {
    if (this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Created
      || this.employeePresenceList[0].PresenceListStatus === WorksheetsPresenceStatus.Changed) {
     this.snackBar.open('Lista je već otključana', 'OK', {
       duration: 10000,
       verticalPosition: 'top'
     });
   } else {
    const formResult = this.worksheetsForm.value;
    this.subService.unlockWorksheetsByManager(formResult, this.loggedEmployeeId, this.loggedUserId).subscribe(res => {
      this.retPostData = res;
      this.snackBar.open(this.retPostData, 'OK', {
        duration: 10000,
        verticalPosition: 'top'
      });
      this.lockWorksheet = false;
      this.unlockWorksheet = true;
    });
  }

  }



  download() {
const columns = PdfPrint.setPrint(this.dateList);

    const columns1 = [
      {title: 'ID', dataKey: 'id'},
      {title: 'Name', dataKey: 'name'},
      {title: 'Country', dataKey: 'country'}
  ];
  const rows = [
      {'id': 1, 'name': 'Shaw', 'country': 'Tanzania'},
      {'id': 2, 'name': 'Nelson', 'country': 'Kazakhstan'},
      {'id': 3, 'name': 'Garcia', 'country': 'Madagascar'}
  ];

    // const doc = new jsPDF();
    // doc.text(20, 20, 'Hello world!');
    // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    // doc.addPage();
    // doc.text(20, 20, 'Do you like that?');

    // // Save the PDF
    // doc.save('RadnaLista.pdf');

    const doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('table.pdf');
}

setPrint = (dateList) => {
const pdfColumns = [];
  for (let i = 1; i < dateList.length; i++) {
    this.title = dateList[i];
    this.dataKey = i.toString();
    pdfColumns.push(this.title, this.dataKey);
  }
  return pdfColumns;
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
  //  for (let i = 0; i < presenceListCopy.length; i++) {
  //   const item = presenceListCopy[i];
  //         for (let ii = 0; ii < item.AbsenceSubtype.length; ii++) {
  //           const dayStatus = presenceListCopy[i].AbsenceSubtype[ii].value;
  //           presenceListCopy[i].AbsenceSubtype[ii] = dayStatus;
  //     }
  //  }
    this.loggedEmployeeId = this.loggedUser.value.data.employeeId;
    presenceListCopy.loggedEmployeeId = this.loggedUser.value.data.employeeId;
    presenceListCopy.loggedUserId = this.loggedUserId;

    const empPresenceList: EmployeePresenceList = presenceListCopy;
    empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Created;
    this.subService.putWorksheets(empPresenceList);

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

