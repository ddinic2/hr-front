import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { Employee} from 'src/app/models/employee';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'hr-worksheets-form',
  templateUrl: './worksheets-form.component.html',
  styleUrls: ['./worksheets-form.component.scss']
})
export class WorksheetsFormComponent implements OnInit {
  employeeWorksheetsForm: FormGroup;
  employeeOptions: Employee[] = []; 
  worksheetsYearOptions: number[] = [];
  displayedColumns: string[] = ['employeeName'];
  dateArray: number[] = [31];
  dateList:number[]= [];
  
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  

  constructor(private _fromBuilder: FormBuilder, public subService: SubstituteService) {
    this.employeeWorksheetsForm = this._fromBuilder.group({
      employee: [''],
      year: ['']
    });
   
   }

  ngOnInit() {
    this.subService.getEmployee().subscribe (res => {this.employeeOptions = res});
    this.subService.getWorksheetsYear().subscribe (res=> {this.worksheetsYearOptions = res});
     
    this.dateList =  this.dateArrayListDetails(this.dateArray);
    
  }

  displayFn(employee: any): string | undefined {
    return typeof (employee) === 'string' ? employee : `${employee.FirstName} ${employee.Surname}`;
  }

  dateArrayListDetails = function (dateArray)
  {
    for(var i = 1; i <= dateArray; i++) { 
     this.dateList.push(i);
    };
    return this.dateList;
  }



}
