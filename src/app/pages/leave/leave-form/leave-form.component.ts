
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubstituteService } from '../substitute.service';
import { EmployeeAbsence } from 'src/app/models/employee-absence';
import { Employee } from 'src/app/models/employee';


@Component({
  selector: 'hr-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  employeeAbsenceForm: FormGroup;
  filteredOptions: Observable<Employee[]>;
  options: Employee[] = [];
  holidayDays: any;

  constructor(private _formBuilder: FormBuilder, private _subsService: SubstituteService) { }

  ngOnInit() {
    this.employeeAbsenceForm = this._formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      replaceEmployee: ['', Validators.required]
    });

    this._subsService.getRelevantSubstitutes().subscribe(result => this.options = result);

    // this._subsService.getHolidayDays().subscribe(res => 
    //    this.holidayDays = res);


    this.employeeAbsenceForm.controls['fromDate'].valueChanges.subscribe(value => {
      if (value && this.employeeAbsenceForm.controls['toDate'].value) {
        this._subsService.getSubstitutesByDate(value, this.employeeAbsenceForm.controls['toDate'].value).subscribe(result => {
          this.options = result;
          this.employeeAbsenceForm.controls['replaceEmployee'].setValue(undefined);
        });
      }
    });

    this.employeeAbsenceForm.controls['toDate'].valueChanges.subscribe(value => {
      if (value && this.employeeAbsenceForm.controls['fromDate'].value) {
        this._subsService.getSubstitutesByDate(this.employeeAbsenceForm.controls['fromDate'].value, value).subscribe(result => {
          this.options = result;
          this.employeeAbsenceForm.controls['replaceEmployee'].setValue(undefined);
        });
      }
    });

    this.filteredOptions = this.employeeAbsenceForm.controls['replaceEmployee'].valueChanges
      .pipe(startWith<string | Employee>(''),
        map((name: string) => {
          console.log(name);
          return name && name.length >= 0 ? this._filter(name) : this.options.slice()
        }),

      );
  }

  private _filter(name: string): any[] {
    if (this.options !== undefined) {
      this.options = this.options.slice(0, 4);
      return this.options.filter(
        (option: any) =>
          option.FirstName!.toLowerCase().indexOf(name.toLowerCase()) === 0
      );
      // return this.options.filter(
      //   (option: any) =>  option.FullName.inncludes(name.toLocaleLowerCase())
      // );
    }
  }

  displayFn(option: any): string | undefined {
    return typeof (option) === 'string' ? option : `${option.FirstName ? option.FirstName : 'nema ime'} ${option.Surname ? option.Surname : 'nema prezime'}`;
  }

  saveAbsence() {
    const formResult: EmployeeAbsence = this.employeeAbsenceForm.value;
    console.log(JSON.stringify(formResult, null, 2));
    this._subsService.postAbsence(formResult);
  }
}



