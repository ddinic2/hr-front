import { AbscenceService } from './../abscence.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { LoginService } from 'src/app/shared/shared/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggedUser } from 'src/app/models/logged-user';
import { TimsGridComponent } from 'timsystems-lib';
import {MatSnackBar } from '@angular/material';

@Component({
  selector: 'hr-abscences-list',
  templateUrl: './abscences-list.component.html',
  styleUrls: ['./abscences-list.component.scss'],
})
export class AbscencesListComponent implements OnInit {
  public retPostData;
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
    'Status odsustva',
    'Tip odsustva'

  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfdays',
    'AbsenceProcessStatusName',
    'AbsenceTypeName'

  ];

  constructor(private service: AbscenceService, private loginService: LoginService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedInUser();
  }

  getRepoIssues = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number = this.absProcessStatus,
    absenceType: number = this.absenceType
  ) => this.service.getAbscences(order, direction, page, count, status, absenceType);

  
  edit = item => {
    this.service.editAbsence(item).subscribe(res => {
      this.retPostData = res;
       this.snackBar.open(this.retPostData, 'OK', {
       duration: 10000,
       verticalPosition: 'top'
       })
      }
    )};


    
  remove = item => {
    const absenceId = item.EmployeeAbsence;
    this.service.removeAbsence(absenceId).subscribe(res => {
      this.retPostData = res;
       this.snackBar.open(this.retPostData, 'OK', {
       duration: 10000,
       verticalPosition: 'top'
       })
       this.performRefresh();
      }
    )}

 

  //Odobravanje odsustva NAPOMENA: LoggedUser da se zameni sa objektom
  approve = item => {
    item.AbsenceProcessStatus = this.absenceProcessStatus.Approved;
    item.LoggedUserId = this.loggedUser.value.data.employeeId;
    item.LoggedUserEmail = this.loggedUser.value.data.employeeEmail;
    item.LoggedUserRoleId = this.loggedUser.value.data.roleId;
    item.LoggedUsername = this.loggedUser.value.data.username;
    this.service
      .changeAbsenceStatus(item)
      .subscribe(res => {
        item.AbsenceProcessStatusName = res;
        this.performRefresh();
      });
  };


  performRefresh = () => {
    this.grid.refresh();
  }



  

   

  //Ponistavanje odsustva
  deny = item => {
    const dialogRef = this.dialog.open(DialogDenyMessage, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value.deny) {
        item.AbsenceProcessStatus = this.absenceProcessStatus.Deny;
        item.description = result.value.description;
        item.LoggedUserId = this.loggedUser.value.data.employeeId;
        item.LoggedUserEmail = this.loggedUser.value.data.employeeEmail;
        item.LoggedUserRoleId = this.loggedUser.value.data.roleId;
        item.LoggedUsername = this.loggedUser.value.data.username;
        console.log('Item je :' + item);
        this.service.changeAbsenceStatus(item)
          .subscribe(res => {
            item.AbsenceProcessStatusName = res;
            this.performRefresh();
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
