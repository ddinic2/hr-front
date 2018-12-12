export interface Employee {
    employeeId: number;
    employeeName: string;
    firstName: string;
    surname: string;
    orgUnitName: string;
    jobTypePosition?: number;
    employeeEmail: string;
    roleId: number;
    position: number;
    jobTypeName: string;
    hRNumber: string;
    startDate: Date;
    endDate: Date;
    OrgUnit: number;
    contractNumber2: string;
    message: string;
}

export interface EmployeeMotiv8 {
  EmployeeId: number;
  HRNumber: number;
  FirstName: string;
  Surname: string;
  ParentName: string;
  EmployeeName: string;
  PersonalNumber: number;
  DateOfBirth: Date;
  Position: number;
  OrgUnit: number;
  OrgUnitName: string;
  ManagerID: number;
  ManagerName: string;
  JobTypeID: number;
  JobTypeName: string;
  EmployeeEmail: string;
  StartDate: Date;
  EndDate: Date;
  ResidenceCityID: number;
  ResidenceAddress: string;
  ContractNumber: string;
  ContractNumber2: string;
  FamilyHoliday;
  FamilyHolidayDay;
  FamilyHolidayMonth;
  FullFamilyHolidayDate: Date;
  message: string;
  StartDateInOrgUnit: Date;
  DateToInOrgUnit: Date;
}
