import { Component } from "@angular/core";
import { AbsenceTypes } from "src/app/models/enums/absence-type";

@Component({
    selector: 'hr-leave',
    templateUrl: './leave.component.html'
})

export class LeaveComponent {
    absenceTypes = AbsenceTypes;
    constructor() { }
}

