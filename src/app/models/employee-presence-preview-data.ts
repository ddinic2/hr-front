export interface EmployeePresencePreviewData {
  employeeID: number;
  employeeHRNumber: string;
  employeeFirstName: string;
  employeeSurname: string;
  workingHoursNumber: number;
  nightShiftHoursNumber: number;
  overworkHoursNumber: number;
  vacationHoursNumber: number;
  holidaysHoursNumber: number;
  paidAbsenceHoursNumber: number;
  sickAbsenceShortHoursNumber: number;
  sickAbsenceMediumHoursNumber: number;
  sickAbsenceLongHoursNumber: number;
  childBirthAbsenceHoursNumber: number;
  workingDaysNumber: number;
  totalHoursNumber: number;
  regressAmount: number;
}
