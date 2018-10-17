import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidAbsenceFormComponent } from './paid-absence-form.component';

describe('PaidAbsenceFormComponent', () => {
  let component: PaidAbsenceFormComponent;
  let fixture: ComponentFixture<PaidAbsenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidAbsenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidAbsenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
