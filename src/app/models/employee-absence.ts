import { Employee } from './employee';
import { LoggedUser } from './logged-user';

export interface EmployeeAbsence {
    employeeId: number;
    employeeName: string;
    fromDate: Date;
    toDate: Date;
    numOfdays: number;
    employeeAbsence?: number;
    absenceProcessStatus: number;
    absenceProcessStatusName: string;
    absenceProcessStatusNew: number;
    procesStatus: number;
    absenceType: number;
    absenceTypeName: string;
    absenceSubtype: number;
    absenceSubtypeName: string;
    sickLeaveType: number;
    sickLeaveCode: number;
    replacementEmployee: Employee;
    exceptionAbsence: boolean;
    employeeEmail: string;
    message: string;
    description: string;
    //employee: Employee;
    firstName: string;
    surname: string;
    fullName: string;
    jobTypePosition: null;
    position: number;
    replaceEmployee: number;
    loggedUserId: string;
    loggedUserEmail: string;
    loggedUserRoleId: string;
    loggedUsername: string;
    familyHolidayDay: number;
    familyHolidayMonth: number;
    root: string;


}








