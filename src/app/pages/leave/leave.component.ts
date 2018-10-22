import { Component } from "@angular/core";
import { AbsenceTypes } from "src/app/models/enums/absence-type";
import { AbsenceProcessStatus } from "src/app/models/enums/absence-process-satatus";
@Component({
    selector: 'hr-leave',
    templateUrl: './leave.component.html'
})

export class LeaveComponent {
    absenceTypes = AbsenceTypes;
    absenceProcessStatus = AbsenceProcessStatus;
    
    constructor() { }
}



