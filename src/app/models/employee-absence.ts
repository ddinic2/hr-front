import { Employee } from './employee';

export interface EmployeeAbsence {
    employeeId: number,
    fromDate: Date;
    toDate: Date;
    numOfdays: number;
    employeeAbsence?: number;
    absenceProcessStatus: number;
    procesStatus: number;
    absenceType: number;
    absenceTypeName: string;
    absenceSubtype: number;
    absenceSubtypeName: string;
    replacementEmployee: Employee;
    exceptionAbsence: boolean;
    employeeEmail: string;
    message: string;
    //employee: Employee;
}
