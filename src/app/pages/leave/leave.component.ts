import { Component, ViewChild, OnInit } from "@angular/core";
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { Roles } from "src/app/models/enums/role";
import { AbsenceProcessStatus } from "src/app/models/enums/absence-process-satatus";
import { AbscencesListComponent } from "../absence-overview/abscences-list/abscences-list.component";
import { PaidAbsenceFormComponent } from "./paid-absence-form/paid-absence-form.component";
import { SickAbsenceFormComponent } from "./sick-absence-form/sick-absence-form.component";
import { LoginService } from "src/app/shared/shared/login.service";

@Component({
    selector: 'hr-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss']
})

export class LeaveComponent implements OnInit {
    @ViewChild('leaveFormTable')
    leaveAbsGrid: AbscencesListComponent;
    @ViewChild('paidFormTable')
    paidAbsGrid: AbscencesListComponent;
    @ViewChild('sickFormTable')
    sickAbsGrid: AbscencesListComponent;
    @ViewChild('editPaidAbsence')
    editPaidAbsence: PaidAbsenceFormComponent;
    @ViewChild('editSickAbsence')
    editSickAbsence: SickAbsenceFormComponent;

    showTab: boolean;
    showLeaveTab: boolean;
    showWorksheetsTab: boolean;
    grid: AbscencesListComponent;
    loggedUser: any;
    roleId: string;
    rolaHRManager = Roles.HRManager.toString();
    rolaRecord = Roles.Record.toString();

    absenceTypes = AbsenceTypes;
    absenceProcessStatus = AbsenceProcessStatus;

    constructor(public loginService: LoginService) { }

    ngOnInit(): void {

        this.loggedUser =  this.loginService.getLoggedInUser();
        this.roleId = this.loggedUser.value.data.roleId;
    }

    doARefresh = grid => {
        switch (grid) {
            case 'leave':
                this.leaveAbsGrid.performRefresh();
                break;
            case 'paid':
                this.paidAbsGrid.performRefresh();
                break;
            case 'sick':
                this.sickAbsGrid.performRefresh();
                break;
        }
    }

    editEmployeeAbsence = (event) => {
        if(event.AbsenceType == AbsenceTypes.PaidAbsence)
        {
            this.editPaidAbsence.editPaidAbsence(event);
        }
        else if(event.AbsenceType == AbsenceTypes.SickAbsence)
        {
            this.editSickAbsence.editSickAbsence(event);
        }

    }

}



