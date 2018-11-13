import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { AbsenceType } from 'src/app/models/absence-type';
import { LoginService } from 'src/app/shared/shared/login.service';
import { Worksheets } from 'src/app/models/worksheets';
import { EmployeePresenceList } from 'src/app/models/employee-presence-list';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorksheetsPresenceStatus } from 'src/app/models/enums/worksheets-prsence-status';


@Component({
  selector: 'hr-worksheets-form',
  templateUrl: './worksheets-form.component.html',
  styleUrls: ['./worksheets-form.component.scss']
})
export class WorksheetsFormComponent implements OnInit {
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


  constructor(private _fromBuilder: FormBuilder, public subService: SubstituteService, public loginService: LoginService, public dialog: MatDialog) {
    this.worksheetsForm = this._fromBuilder.group({
      orgUnit: [''],
      year: [''],
      month: [''],
      absenceTypeControl: [''],
      registrator: ['']
    });

  }

  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedInUser();
    this.subService.getOrgUnit().subscribe(res => { this.orgUnitOptions = res });
    this.subService.getWorksheetsYears().subscribe(res => { this.worksheetsYearsOptions = res });
    this.subService.getWorksheetsMonths().subscribe(res => { this.worksheetsMonthsOptions = res });
    this.subService.getAbsenceTypeWorksheets().subscribe(res => {
    this.absenceTypeOptions = res;
      //this.absenceTypeOptions.push({ hrAbsenceTypeID: 0, name: '' })
    })
    this.subService.getPresenceDetailType().subscribe(res => { this.presenceDetailTypeOptions = res });


    //this.worksheetsForm.get('month').setValue(1);
    //this.worksheetsForm.get('year').setValue(2018);

    this.worksheetsForm.controls['year'].valueChanges.subscribe(value => {
      if (value && this.worksheetsForm.controls['month'].value) {
        this.subService.getRegistratorByDate(this.worksheetsForm.controls['month'].value, value).subscribe((result) => {
          this.registratorOptions = result;
        });
      }
    });

  }

  detailsPresence() {
    const formResult = this.worksheetsForm.value;
    this.subService.getEmployeePresenceList(formResult, this.loggedUser.value.data.employeeId)
      .subscribe(res => {
      this.employeePresenceList = res;
        let result = this.employeePresenceList.map(m => m.DayStatus);
        this.dateList = this.dateArrayListDetails(result[0].length);
      });

  }

  dateArrayListDetails = function (dates) {
    this.dateList.length = 0;
    for (var i = 1; i <= dates; i++) {
      this.dateList.push(i);
    };
    return this.dateList;
  }

  compareWorksheets() {
    const formResult = this.worksheetsForm.value;
    this.subService.compareWorksheetsByRegistrator(formResult, this.loggedUser.value.data.employeeId)
      .subscribe(res => {
      this.comparePresenceList = res
        let result = this.comparePresenceList.map(m => m.PresenceTypeCode);
        this.dateList = this.dateArrayListDetails(result[0].length);
      });
  }

  selectedItem = (item, index, event) => {
    item.DayStatus[index] = event;
  }

  saveWorksheets = () => {
    this.loginUserId = this.loggedUser.value.data.employeeId;
    this.employeePresenceList.loginUserId = this.loggedUser.value.data.employeeId;
    const empPresenceList: EmployeePresenceList = this.employeePresenceList;
    this.subService.checkedPresenceStatus(empPresenceList);
    if (empPresenceList.lockPresenceList) {

      const dialogRef = this.dialog.open(DialogOverviewWorksheets, {
        width: '250px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Lock;
          this.subService.putWorksheets(empPresenceList);

        }

      });
    }
    else {
      empPresenceList.presenceListStatus = WorksheetsPresenceStatus.Created;
      this.subService.putWorksheets(empPresenceList);
    }

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

