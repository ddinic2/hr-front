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
    'Regres bruto',
    'Nova kolona'
  ];

  displayedColumns = [
    'ChildBirthAbsenceHoursNumber',
    'EmployeeFirstName',
    'EmployeeHRNumber',
    'EmployeeID',
    'EmployeeSurname',
    'HolidaysHoursNumber',
    'NightShiftHoursNumber',
    'OverworkHoursNumber',
    'PaidAbsenceHoursNumber',
    'RegressAmount',
    'SickAbsenceLongHoursNumber',
    'SickAbsenceMediumHoursNumber',
    'SickAbsenceShortHoursNumber',
    'TotalHoursNumber',
    'VacationHoursNumber',
    'WorkingDaysNumber',
    'WorkingHoursNumber'
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

  exportToExcel = (items) => {
    const formResult = this.worksheetsBillingForm.value;
    return this.subService.exportToexcel(formResult);
  }
}
