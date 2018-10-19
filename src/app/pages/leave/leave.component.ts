import { Component } from "@angular/core";
import { MatTabChangeEvent, mixinTabIndex } from '@angular/material';
import { AbscenceService } from 'src/app/pages/absence-overview/abscence.service';
import { from } from "rxjs";

@Component({
    selector: 'hr-leave',
    templateUrl: './leave.component.html'
})
export class LeaveComponent {
    order: string;
    direction: string;
    page = 1;
    count = 20;
    status: number;
    absenceType: number

    constructor(private absenceService: AbscenceService) { }
    
    ngOnInit() {
        
    }
    tabChanged = (tabChangeEvent: MatTabChangeEvent) => {
       this.absenceService.getTabIndex(tabChangeEvent.index);
       console.log('Tab test' + this.absenceType);
        console.log('tabChangeEvent => ', tabChangeEvent);
        console.log('index => ', tabChangeEvent.index);
      };
    
}

