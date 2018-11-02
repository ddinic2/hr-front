// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  db: {
    ROOT: 'http://localhost:54278/',
    SUBSTITUTE: 'work-leave',
    ABSCENCE: 'absences',
    ABSENCE_TYPE: '/absence-types',
    EMPLOYEE_SUBSITUTE: '/employee-substitute',
    HOLIDAY_DAYS: '/holiday-days',
    ABSENCE_SICK_LEAVE_TYPE: '/absence-sick-leave-type',
    ABSENCE_SUBTYPE:'/absence-subtype' ,
    SICK_LEAVE_CODE: '/sick-leave-code',
    CHANGE_ABSENCE_STATUS: '/change-absence-status',
    EMPLOYEE: 'employee-data',
    WORKSHEETS: 'worksheets',
    WORKSHEETS_YEAR: '/worksheets-year',
    WORKSHEETS_MONTH: '/worksheets-month',
    ORG_UNIT: '/org-unit',
    PRESENCE_DETAIL_TYPE: '/presence-detail-type'
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
