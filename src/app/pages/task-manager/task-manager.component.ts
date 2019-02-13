import { Component, OnInit } from '@angular/core';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task';
import { sequence } from '@angular/animations';

@Component({
  selector: 'hr-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  constructor() { }

  myTime: any;
  backlog: Task[];
  today: any;
  todo: Task[];
  inProgress: Task[];
  done: Task[];
  tempRes: any;
  task: Task;
  taskId: any;

  fibonacciArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.tempRes = event.container.data[event.currentIndex];
                        this.tempRes.Status = 'toDo';
                        this.iRobotToDo(this.tempRes);
    }
  }

  iRobotToDo(task) {
    const rand = this.fibonacciArray[Math.floor(Math.random() * this.fibonacciArray.length)];
    const timeout = Number(rand.toString() + '000');

    setTimeout(() => {
      task.Status = 'inProgres';
      this.inProgress.push(task);
      this.deleteItem(this.todo, task);
      this.iRobotInProgres(task);
    }, timeout);
  }

  iRobotInProgres(task) {
    const rand2 = this.fibonacciArray[Math.floor(Math.random() * this.fibonacciArray.length)];
    const timeout = Number(rand2.toString() + '000');

    setTimeout(() => {
      task.Status = 'done';
      this.done.push(task);
      this.deleteItem(this.inProgress, task);
      this.iRobotDone(task);
    }, timeout);
  }

  iRobotDone (task) {
    const rand3 = this.fibonacciArray[Math.floor(Math.random() * this.fibonacciArray.length)];
    const timeout = Number(rand3.toString() + '000');

    setTimeout(() => {
      this.deleteItem(this.done, task);
    }, timeout);
  }

  deleteItem (list, task) {
    const taskForDelete = list.filter(function(el) {
      return el.Id === task.Id;
    });
    for (let i = 0; i < list.length; i++) {
      if (taskForDelete[0].Id === list[i].Id) {
        list.splice(i, 1);
      }
    }
  }

  addTask() {
    this.taskId += 1;
    this.backlog.push({Id: this.taskId,
      Name: 'Task',
      Created: new Date(),
      Status: 'backlog'});
  }

  timeout() {
    setTimeout(() => {
      this.today = new Date();
      const h = this.today.getHours();
      const m = this.today.getMinutes();
      const s = this.today.getSeconds();
      const time = h + ' : ' + m + ' : ' + s;
      this.myTime = time;
      if ((s % 8) === 0) {
        this.addTask();
      }
      this.getTimeout();
    }, 500);
  }

  getTimeout() {
    setTimeout(() => {
      this.timeout();
    }, 500);
  }

  ngOnInit() {
    this.inProgress = [];
    this.done = [];
    this.todo = [];
    this.backlog = [];
    this.timeout();
    this.taskId = 0;
  }

}
