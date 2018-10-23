import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { Employee} from 'src/app/models/employee';

@Component({
  selector: 'hr-worksheets-form',
  templateUrl: './worksheets-form.component.html',
  styleUrls: ['./worksheets-form.component.scss']
})
export class WorksheetsFormComponent implements OnInit {
  employeeWorksheetsForm: FormGroup;
  employeeOptions: Employee[] = []; 
  worksheetsYearOptions: number[] = [];


  constructor(private _fromBuilder: FormBuilder, public subService: SubstituteService) {
    this.employeeWorksheetsForm = this._fromBuilder.group({
      employee: [''],
      year: ['']
    });
   }

  ngOnInit() {
    this.subService.getEmployee().subscribe (res => {this.employeeOptions = res});
   
    this.subService.getWorksheetsYear().subscribe (res=> {this.worksheetsYearOptions = res});
        
  }

  displayFn(employee: any): string | undefined {
    return typeof (employee) === 'string' ? employee : `${employee.FirstName} ${employee.Surname}`;
  }

}
