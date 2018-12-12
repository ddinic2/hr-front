import { AbscenceService } from './../abscence.service';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { AbsenceProcessStatus } from 'src/app/models/enums/absence-process-satatus';
import { LoginService } from 'src/app/shared/shared/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggedUser } from 'src/app/models/logged-user';
import { TimsGridComponent } from 'timsystems-lib';
import {MatSnackBar } from '@angular/material';
import { Roles } from 'src/app/models/enums/role';
import { ActivatedRoute } from '@angular/router';
import { EmployeeAbsence } from 'src/app/models/employee-absence';


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
  loggedId: string;
  roleId: string;
  rolaHRManager = Roles.HRManager;
  rolaRecord = Roles.Record;
  root: string;
  checkAbsence: EmployeeAbsence[] = [];
  absenceProcessStatusNew: string;


  @Input() absenceType: number;
  @Input() absProcessStatus: number;
  @Output() editAbsence = new EventEmitter;
  @ViewChild(TimsGridComponent) grid: TimsGridComponent;


  columnNameArray = [
    'Ime i Prezime',
    'Datum od',
    'Datum do',
    'Broj radnih dana',
    'Status odsustva',
    'Tip odsustva',
    'Izuzetak',
    'Komentar'

  ];

  displayedColumns = [
    'EmployeeName',
    'FromDate',
    'ToDate',
    'NumOfdays',
    'AbsenceProcessStatusName',
    'AbsenceTypeName',
    'ExceptionAbsenceName',
    'Description'

  ];

  constructor(private service: AbscenceService, private loginService: LoginService,
     public dialog: MatDialog, public snackBar: MatSnackBar, public viewContainerRef: ViewContainerRef,
     private route: ActivatedRoute ) { }

  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedInUser();
    this.loggedId = this.loggedUser.value.data.employeeId;
    this.roleId = this.loggedUser.value.data.roleId;
    this.checkRoot();
  }

  checkRoot() {
    const root = window.location.href;
    if (root.includes('status')) {
      const queryParams = this.route.snapshot.queryParams;
      if (queryParams.statusApprove) {

        this.approveFromMail(queryParams);
      } else {
        this.denyFromMail(queryParams);
      }


    }
   }

  getRepoIssues = (
    order: string,
    direction: string,
    page = 1,
    count = 20,
    status: number = this.absProcessStatus,
    absenceType: number = this.absenceType,
    loggedId: string = this.loggedId,
    roleId: string = this.roleId
    ) => this.service.getAbscences(order, direction, page, count, status, absenceType, loggedId, roleId)


  edit = item => {
    this.editAbsence.next(item);
    // this.service.editAbsence(item).subscribe(res => {
    //   this.retPostData = res;
    //    this.snackBar.open(this.retPostData, 'OK', {
    //    duration: 10000,
    //    verticalPosition: 'top'
    //    })
    //   }
    // )
  }


  remove = item => {
    const absenceId = item.EmployeeAbsence;
    if (item.AbsenceProcessStatus !== AbsenceProcessStatus.Approved && this.loggedId !== item.EmployeeId.toString()
    && this.roleId === Roles.HRManager.toString()) {
      this.service.removeAbsence(absenceId).subscribe(res => {
        this.retPostData = res;
         this.snackBar.open(this.retPostData, 'OK', {
         duration: 10000,
         verticalPosition: 'top'
         });
         this.performRefresh();
        }
      );
    } else {
      this.snackBar.open('Nema te pravo za brisanje odsustva!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });
    }

  }

  //Odobravanje odsustva NAPOMENA: LoggedUser da se zameni sa objektom
  approve = item => {
    if (item.AbsenceProcessStatus === AbsenceProcessStatus.Created &&
      this.roleId === Roles.Manager.toString() && this.loggedId !== item.EmployeeId.toString()  ||
       (item.AbsenceProcessStatus === AbsenceProcessStatus.Waiting && this.roleId === Roles.HRManager.toString()
        && this.loggedId !== item.EmployeeId.toString() )) {
      if (item.ExceptionAbsence && item.AbsenceProcessStatus === AbsenceProcessStatus.Created) {
        item.AbsenceProcessStatusNew = this.absenceProcessStatus.Waiting;
      } else {
        item.AbsenceProcessStatusNew = this.absenceProcessStatus.Approved;
      }
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
    } else {
      this.snackBar.open('Status odsustva ne može da se promeni!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });
    }
  }

  performRefresh = () => {
    this.grid.refresh();
  }

  //Ponistavanje odsustva
  deny = item => {
      if ((item.AbsenceProcessStatus === AbsenceProcessStatus.Created
             || item.AbsenceProcessStatus === AbsenceProcessStatus.Waiting)
             && this.loggedId !== item.EmployeeId.toString()
             && (this.roleId === Roles.Manager.toString()) ||
       (item.AbsenceProcessStatus !== AbsenceProcessStatus.Deny
                && this.roleId === Roles.HRManager.toString()
                 && this.loggedId !== item.EmployeeId.toString())) {
      const dialogRef = this.dialog.open(DialogDenyMessage, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.value.deny) {
          item.AbsenceProcessStatusNew = this.absenceProcessStatus.Deny;
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
    } else {
      this.snackBar.open('Odsustvo ne može da se poništi!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });
    }
  }

  //Odobravanje odsustva iz mejla
  approveFromMail = (queryParams) => {
      const employeeAbsence = (queryParams.empAbsId);
      const employeeId = (queryParams.employeeId);
      const absenceProcessStatusNew = queryParams.statusApprove;
      const exceptionAbsence = (queryParams.exception);
      const numOfDays = queryParams.numOfDays;
      const absenceType = queryParams.absType;
      const loggedUserEmail = this.loggedUser.value.data.employeeEmail;
      const loggedUserRoleId = this.loggedUser.value.data.roleId;
      const loggedUserId = this.loggedUser.value.data.employeeId;

    this.service.changeAbsenceStatusFromMail(employeeId, employeeAbsence, exceptionAbsence, numOfDays,
      absenceProcessStatusNew, loggedUserEmail, loggedUserRoleId, loggedUserId)
      .subscribe(res => {
        queryParams.AbsenceProcessStatusName = res;
        this.performRefresh();
      });
  }

  //Ponistavanje odsustva iz mejla
  denyFromMail = queryParams => {
      const dialogRef = this.dialog.open(DialogDenyMessage, {
        width: '250px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.value.deny) {
          const employeeAbsence = queryParams.empAbsId;
          const employeeId = queryParams.employeeId;
          const exceptionAbsence = queryParams.exception;
          const absenceProcessStatusNew = queryParams.statusDeny;
          const numOfDays = queryParams.numOfDays;
          const absenceType = queryParams.absType;
          const loggedUserEmail = this.loggedUser.value.data.employeeEmail;
          const loggedUserRoleId = this.loggedUser.value.data.roleId;
          const loggedUserId = this.loggedUser.value.data.employeeId;

          this.service.changeAbsenceStatusFromMail(employeeId, employeeAbsence, exceptionAbsence, numOfDays,
            absenceProcessStatusNew, loggedUserEmail, loggedUserRoleId, loggedUserId)
            .subscribe(res => {
              queryParams.AbsenceProcessStatusName = res;
              this.performRefresh();
            });
        }
      });

  }

  generate = item => {
    if (item.AbsenceProcessStatus === AbsenceProcessStatus.Approved && this.roleId === Roles.HRManager.toString()
    && this.loggedId !== item.EmployeeId.toString()) {
      item.LoggedUserId = this.loggedUser.value.data.employeeId;
    item.LoggedUserEmail = this.loggedUser.value.data.employeeEmail;
    item.LoggedUserRoleId = this.loggedUser.value.data.roleId;
    this.service.generateDocument(item.EmployeeAbsence, item.EmployeeId, item.AbsenceType,
    item.LoggedUserId, item.LoggedUserEmail, item.LoggedUserRoleId )
    .subscribe(data => {
        let thefile = {};
        thefile = data;
        //thefile = new File(data, 'data.xlsx');
        const url = URL.createObjectURL(data.body);
        const disposition = data.headers.getAll('content-disposition');
        const filename = '';

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
      });

    } else {
      this.snackBar.open('Dokument ne može da se generiše!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });

    }

  }

  link = item => {
    if (this.roleId === Roles.HRManager.toString() && item.AbsenceProcessStatus === AbsenceProcessStatus.Approved
    && this.loggedId !== item.EmployeeId.toString()) {
      this.service.getDocument(item.EmployeeAbsence, item.EmployeeId)
      .subscribe(data => {
        if (data.body != null) {
          let thefile = {};
          thefile = data;
          const url = URL.createObjectURL(data.body);
          const disposition = data.headers.getAll('content-disposition');
          const filename = '';

          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = filename;
          a.click();
          a.remove();
        } else {
          this.snackBar.open('Dokument nije generisan!', 'OK', {
            duration: 10000,
            verticalPosition: 'top'
            });
        }

      });
    } else {
      this.snackBar.open('Dokument nije u statusu "odobren" ili nemate pravana da otvorite dokument!', 'OK', {
        duration: 10000,
        verticalPosition: 'top'
        });
    }


  }

}
@Component({
  selector: 'hr-dialog-deny-message',
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
  }
}
