export class LoggedUserInfo {
  EmployeeID: number;
  EmployeeFullName: string;
  EmployeeHRNumber: string;
  EmployeeOrgUnitID: number;
  EmployeeOrgUnitName: string;
  EmployeePositionID: number;
  EmployeePositionName: string;
  EmployeeManagerID: number;
  EmployeeManagerName: string;
  EmployeeGrade: number;
  SurveyStartDate: Date;
  SurveyEndDate: Date;
  EmployeeIsManager: boolean;
  SurveyAnswerID: number;
}

export class Category {
    name: string;
    value: string;
}
export class Status {
    StatusCode: string;
    StatusName: string;
    Motiv8TargetEvaluationStatus1: number;
}

export class Test {
    Motiv8TargetEvaluationStatus1: number;
    StatusName: string;
    StatusCode: string;
    Created: string;
    CreatedBy: number;
    Modified: string;
    ModifiedBy: number;
}

export class CategoryOfTask {
    Motiv8TargetCategory1: number;
    CategoryName: string;
    CategoryCode: string;
}

export class WhatRequest {
    Motiv8TargetID: number;
    Motiv8SurveyAnswerID: number;
    TargetName: string;
    TargetCategory: number;
    TargetStatus: number;
    TargetDescription: string;
    MeasurableResult: string;
    TargetWeight: number;
    TargetDueDate: Date;
    TargetStatusCode: string;
}
export class WhatHalf {
    Motiv8TargetID: number;
    Motiv8SurveyAnswerID: number;
    TargetName: string;
    TargetCategory: number;
    TargetStatus: number;
    TargetDescription: string;
    MeasurableResult: string;
    TargetWeight: number;
    TargetDueDate: Date;
    TargetEvaluationPeriod: number;
    TargetEvaluationStatus: number;
    TargetEvaluationProgressPercent: number;
    TargetEmployeeMark: number;
    TargetEmployeeComment: string;
    TargetManagerMark: number;
    TargetManagerComment: string;
}

export class WhatYearly {
  Motiv8TargetID: number;
  Motiv8SurveyAnswerID: number;
  TargetName: string;
  TargetCategory: number;
  TargetCategoryName: string;
  TargetStatus: number;
  TargetDescription: string;
  MeasurableResult: string;
  TargetWeight: number;
  TargetDueDate: Date;
  TargetEvaluationPeriod: number;
  TargetEvaluationStatus: number;
  TargetEvaluationProgressPercent: number;
  TargetEmployeeMark: number;
  TargetEmployeeComment: string;
  TargetManagerMark: number;
  TargetManagerComment: string;
}

export class How {
  Motiv8SurveyBehaviorAnswerID: number;
  Motiv8SurveyBehaviorType: number;
  BehaviorCode: string;
  BehaviorName: string;
  BehaviorDescription: string;
  EmployeeMark: number;
  ManagerMark: number;
}

