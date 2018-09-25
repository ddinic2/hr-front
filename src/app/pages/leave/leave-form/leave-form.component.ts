import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { SubstituteService } from '../substitute.service';

@Component({
  selector: 'hr-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  substituteControl = new FormControl();
  filteredOptions: Observable<any[]>;
  Employee = new EventEmitter();
  options: any[];

  constructor(private subs: SubstituteService) {}
  selectedEmployee = event => {
    this.Employee.emit(event.option.value);
  }
  ngOnInit() {
    this.substituteControl.valueChanges
      .pipe(
        debounceTime(600),
        startWith<string | any>(''),
        map(value => (typeof value === 'string' ? value : value.name))
      )
      .subscribe(val => {
        if (typeof(val) === 'string' && val.toString().length > 2) {
          this.subs.getSubstitutes(val.toString()).subscribe(result => {
            console.log(result);
            this.options = result;
          });
        }
      });
  }
  displayFn(user?: any): string | undefined {
    return user
      ? user.FirstName + ' ' + user.Surname + ' : ' + user.OrgUnitName
      : undefined;
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
