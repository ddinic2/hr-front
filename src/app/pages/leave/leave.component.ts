import { Component, ViewChild, OnInit } from "@angular/core";
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from "src/app/models/enums/absence-process-satatus";
import { AbscencesListComponent } from "../absence-overview/abscences-list/abscences-list.component";
@Component({
    selector: 'hr-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss']
})

export class LeaveComponent implements OnInit {
    @ViewChild('leaveFormTable')
    nekiGrid: AbscencesListComponent;
    @ViewChild('paidFormTable')
    nekidrugiGrid: AbscencesListComponent;
    @ViewChild('sickFormTable')
    nekitreciGrid: AbscencesListComponent;


    grid: AbscencesListComponent;

    absenceTypes = AbsenceTypes;
    absenceProcessStatus = AbsenceProcessStatus;

    constructor() { }

    ngOnInit(): void {
        console.log(this.grid);
    }

    doARefresh = grid => {
        switch (grid) {
            case 'leave':
                this.nekiGrid.performRefresh();
                break;
            case 'paid':
                this.nekidrugiGrid.performRefresh();
                break;
            case 'sick':
                this.nekitreciGrid.performRefresh();
                break;
        }
    }

}



