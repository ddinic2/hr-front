import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetsFormComponent } from './worksheets-form.component';

describe('WorksheetsFormComponent', () => {
  let component: WorksheetsFormComponent;
  let fixture: ComponentFixture<WorksheetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
