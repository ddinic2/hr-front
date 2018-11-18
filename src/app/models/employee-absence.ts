import { Employee } from './employee';
import { LoggedUser } from './logged-user';

export interface EmployeeAbsence {
    employeeId: number,
    employeeName: string;
    fromDate: Date;
    toDate: Date;
    numOfdays: number;
    employeeAbsence?: number;
    absenceProcessStatus: number;
    absenceProcessStatusName: string;
    procesStatus: number;
    absenceType: number;
    absenceTypeName: string;
    absenceSubtype: number;
    absenceSubtypeName: string;
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
    LoggedUserId: string;
    LoggedUserEmailId: string;
    LoggedUserRoleId: string;
    LoggedUsername: string;

}








