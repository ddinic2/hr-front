import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubstituteService } from '../substitute.service';
import { LoginService } from 'src/app/shared/shared/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hr-worksheets-billing-form',
  templateUrl: './worksheets-billing-form.component.html',
  styleUrls: ['./worksheets-billing-form.component.scss']
})
export class WorksheetsBillingFormComponent implements OnInit {
  worksheetsBillingForm: FormGroup;
  loggedUser: any;
  worksheetsMonthsOptions: number[] = [];
  worksheetsYearsOptions: number[] = [];
  employeePresenceList: any;
  pipesToApply = [];
  showTable = false;

  columnNameArray = [
    'HR Broj',
    'Ime',
    'Prezime',
    'Redovan rad',
    'Noćni rad',
    'Prekovremeni',
    'Godišnji odmor',
    'Državni praznici',
    'Plaćeno odsustvo',
    'Bolovanje do 5 dana',
    'Bolovanje do 30 dana',
    'Bolovanje preko 30 dana',
    'Porodiljsko',
    'TO dani',
    'Ukupno',
    'Regres bruto'

  ];

  displayedColumns = [
    'EmployeeHRNumber',
    'EmployeeFirstName',
    'EmployeeSurname',
    'WorkingDaysNumber',
    'NightShiftHoursNumber',
    'OverworkHoursNumber',
    'VacationHoursNumber',
    'HolidaysHoursNumber',
    'PaidAbsenceHoursNumber',

    'SickAbsenceShortHoursNumber',
    'SickAbsenceMediumHoursNumber',
    'SickAbsenceLongHoursNumber',
    'ChildBirthAbsenceHoursNumber',
    'WorkingHoursNumber',
    'TotalHoursNumber',
    'RegressAmount',

  ];

  constructor(
    private _fromBuilder: FormBuilder,
    public subService: SubstituteService,
    public loginService: LoginService,
    public snackBar: MatSnackBar
  ) {
    this.worksheetsBillingForm = this._fromBuilder.group({
      year: [''],
      month: ['']
    });
  }
  ngOnInit() {
    this.loggedUser = this.loginService.getLoggedInUser();
    this.subService.getWorksheetsYears().subscribe(res => {
      this.worksheetsYearsOptions = res;
    });
    this.subService.getWorksheetsMonths().subscribe(res => {
      this.worksheetsMonthsOptions = res;
    });
  }

  detailsPresence = () => {
    const formResult = this.worksheetsBillingForm.value;
     this.showTable = true;
   return this.subService.getPreviewEmployeePresenceData(formResult);
  }

  exportToExcel = () => {
    const year = this.worksheetsBillingForm.controls['year'].value;
    const month = this.worksheetsBillingForm.controls['month'].value;

    return this.subService.exportToExcel(year, month)
    .subscribe(data => {
      let thefile = {};
      thefile = data;
      //thefile = new File(data.,'data.xlsx');
      const url = URL.createObjectURL(data.body);
      const disposition = data.headers.getAll('content-disposition');
      let filename = '';

      disposition.forEach(element => {
        const filenameRegex = new RegExp('filename=(.*?);', 'g');
        const test = filenameRegex.exec(element);
        if (test && test.length > 0) {
          filename = test[1];
        }
      });

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
    });

  }
}
