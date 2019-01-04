// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  db: {
    ROOT: 'http://10.111.10.41:22900/',
    // ROOT: 'http://localhost:54278/',
    SUBSTITUTE: 'work-leave',
    ABSCENCE: 'absences',
    ABSENCE_TYPE: '/absence-types',
    ABSENCE_TYPE_WORKSHEETS: '/absence-types-worksheets',
    YEAR_VACATION: '/year-vacation',
    EMPLOYEE_SUBSITUTE: '/employee-substitute',
    HOLIDAY_DAYS: '/holiday-days',
    HOLIDAY_DAYS_CALENDAR: '/holiday-days-calendar',
    FAMILY_HOLIDAY: '/family-holiday',
    EMPLOYEE_FAMILY_HOLIDAY: '/employee-family-holiday',
    ABSENCE_SICK_LEAVE_TYPE: '/absence-sick-leave-type',
    ABSENCE_SUBTYPE: '/absence-subtype' ,
    CHECK_ABSENCE_SUBTYPE: '/check-absence-subtype',
    SICK_LEAVE_CODE: '/sick-leave-code',
    CHANGE_ABSENCE_STATUS: '/change-absence-status',
    EMPLOYEE: 'employee-data',
    WORKSHEETS: 'worksheets',
    WORKSHEETS_YEAR: '/worksheets-year',
    WORKSHEETS_MONTH: '/worksheets-month',
    ORG_UNIT: '/org-unit',
    PRESENCE_DETAIL_TYPE: '/presence-detail-type',
    PRESENCE_REGISTRATOR: '/presence-registrator',
    COMPARE_WORKSHEETS: '/compare-worksheets',
    LOCK_WORKSHEETS: '/lock-worksheets',
    UNLOCK_WORKSHEETS: '/unlock-worksheets',
    GENERATE_DOCUMENT: '/generate-document',
    GET_EMPLOYEE: '/get-employee',
    WORKSHEETS_BILLING: '/worksheets-billing',
    EXPORT_TO_EXCEL: '/export-to-excel',
    GET_GENERATE_DOCUMENT: '/get-generate-document',
    EMPLOYEE_ABSENCE_WORKSHEETS: '/employee-absence-worksheets'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
