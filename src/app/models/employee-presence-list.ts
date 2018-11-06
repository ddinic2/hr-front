export interface EmployeePresenceList{
    employeeID: number;
    employeeHRNumber: string;
    employeeFullName: string;
    employeePresenceListDetailID: number;
    employeePresenceListID: number;
    dayStatus: number[];
    loginUserId: number;
    month: number;
    year: number;
    employeePresenceRegion: number;
    presenceListStatus: number,
    lockPresenceList: boolean;
}