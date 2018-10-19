import { Employee } from './employee';

export interface EmployeeAbsence {
    fromDate: Date;
    toDate: Date;
    numOfdays: number;
    employeeAbsence?: number;
    absenceProcessStatus: number;
    procesStatus: number;
    absenceType: number;
    absenceTypeName: string;
    //employee: Employee;
    replacementEmployee: Employee;
}
