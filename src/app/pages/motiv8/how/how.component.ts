import { Component, OnInit } from '@angular/core';
import { How, HOWS , LoggedUserInfo } from 'src/app/models/logged-user-info';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'hr-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.scss']
})
export class HowComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  tasks = HOWS;

  gradeHow = this.fb.group({
    EmployeeGradeFor1: [''],
    ManagerGradeFor1: [''],
    EmployeeGradeFor2: [''],
    ManagerGradeFor2: [''],
    EmployeeGradeFor3: [''],
    ManagerGradeFor3: ['']
  });

  save() {
   console.log(this.gradeHow.value);
  }

  ngOnInit() {
    console.log('taskovi za how', this.tasks);
  }

}
