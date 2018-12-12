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

<<<<<<< Updated upstream
=======
export const HOWS: How[] = [
  {BehaviorDescriptions: 'Skromnost', BehaviorListOfTask: 'Jako je skroman ovaj lik', ManagerGrade: null, EmployeeGrade: null},
  {BehaviorDescriptions: 'Istrajnost', BehaviorListOfTask: 'Jako je Istrajnost ovaj lik', ManagerGrade: null, EmployeeGrade: null},
  {BehaviorDescriptions: 'Odlučnost', BehaviorListOfTask: 'Jako je Odlučnost ovaj lik', ManagerGrade: null, EmployeeGrade: null},
  {BehaviorDescriptions: 'Odnos prema kolegama', BehaviorListOfTask: 'Jako je dobar prema kol.', ManagerGrade: null, EmployeeGrade: null}
];

export class TotalYearly {
  Motiv8SurveyAnswer: number;
  Motiv8Survey: number;
  TotalMarkWHAT: number;
  TotalMarkHOW: number;
  TotalMarkPerformance: number;
  EmployeePotentialID: number;
  EmployeePotentialDescription: string;
  TotalCommentEmployee: string;
  TotalCommentManager: string;
}

export class Potential {
  Motiv8EmployeePotential1: number;
  PotentialName: string;
  PotentialCode: string;
  Created: Date;
  CreatedBy: Date;
  Modified: Date;
  ModifiedBy: number;
}

export class DevelopmentPlan {
  Motiv8DevelopmentActionPlan: number;
  Motiv8SurveyAnswerID: number;
  DevelopmentNeed: string;
  DevelopmentAction: string;
  ResponsibleEmployeeID: number;
  ResponsibleEmployeeFullName: string;
  ResponsibleEmployeeHRNumber: string;
  Deadline: Date;
}
>>>>>>> Stashed changes
