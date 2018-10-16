import { Employee } from './employee';

export interface EmployeeAbsence {
    fromDate: Date;
    toDate: Date;
    numOfdays: number;
    hrEmployeeAbsence?: number;
    hrAbsenceProcessStatus: number;
    hrProcesStatus: number;
    hRAbsenceType: number;
    hrAbsenceTypeName: string;
    employee: Employee;
    replaceEmployee: number;
}
