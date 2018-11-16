import { AbscenceService } from './../abscence.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { LoginService } from 'src/app/shared/shared/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimsGridComponent } from 'timsystems-lib';

@Component({
  selector: 'hr-abscences-list',
  templateUrl: './abscences-list.component.html',
  styleUrls: ['./abscences-list.component.scss'],
})
export class AbscencesListComponent implements OnInit {
  pipesToApply = [];
  absenceProcessStatus = AbsenceProcessStatus;
  loggedUser: any;
  data: any;
  ok: boolean;

  @Input() absenceType: number;
  @Input() absProcessStatus: number;

 @ViewChild(TimsGridComponent) grid: TimsGridComponent;

  columnNameArray = [
    'Ime i Prezime',
    'Datum od',
    'Datum do',
    'Broj radnih dana',
    //'HRJobTypePosition',
    'Status odsustva',
    'Tip odsustva'
    //'HREmployeeAbsence',
  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfdays',
    //'JobTypePosition',
    'AbsenceProcessStatusName',
    'AbsenceTypeName'
    //'EmployeeAbsence',
  ];

  constructor(private service: AbscenceService, private loginService: LoginService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedInUser();
    console.log(this.grid);
  }

    getRepoIssues = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number = this.absProcessStatus,
    absenceType: number = this.absenceType
  ) => this.service.getAbscences(order, direction, page, count, status, absenceType);

  //Odobravanje odsustva
  approve = item => {
    this.service
      .changeAbsenceStatus(item.EmployeeAbsence, (item.AbsenceProcessStatus = this.absenceProcessStatus.Approved), null)
      .subscribe(res => {
        item.AbsenceProcessStatusName = res;
        this.grid.refresh();
        
      });
  };
  //Ponistavanje odsustva
  deny = item => {
    const dialogRef = this.dialog.open(DialogDenyMessage, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value.deny) {
        this.service
          .changeAbsenceStatus(
            item.EmployeeAbsence,
            (item.AbsenceProcessStatus = this.absenceProcessStatus.Deny),
            result.value.description
          )
          .subscribe(res => {
            item.AbsenceProcessStatusName = res;
          });
      }
    });
  };

  generate = item => {
    this.service.generateDocument(item.EmployeeAbsence, item.EmployeeId, item.AbsenceType)
    .subscribe(data => {
      let thefile = {};
      thefile = data;
      // thefile = new File(data, 'data.xlsx');
      const url = URL.createObjectURL(data.body);
      const disposition = data.headers.getAll('content-disposition');
      let filename = '';
      
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
    });
  };

  // edit = (item) =>
  // console.log('edit');
  // save = (item) =>
  // console.log('save');
  // view = (item) =>
  // console.log('view');
}
@Component({
  selector: 'dialog-deny-message',
  templateUrl: 'dialog-deny-message.html',
})
export class DialogDenyMessage {
  dialogFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogDenyMessage>) {
    this.dialogFormGroup = this._formBuilder.group({
      description: [''],
      deny: [''],
    });
  }

  onClick = data => {
    this.dialogFormGroup.controls['deny'].setValue(data);
    this.dialogRef.close(this.dialogFormGroup);
  };
}
