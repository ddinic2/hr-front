import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickAbsenceFormComponent } from './sick-absence-form.component';

describe('SickAbsenceFormComponent', () => {
  let component: SickAbsenceFormComponent;
  let fixture: ComponentFixture<SickAbsenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickAbsenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickAbsenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
