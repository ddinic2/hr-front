import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetsBillingFormComponent } from './worksheets-billing-form.component';

describe('WorksheetsBillingFormComponent', () => {
  let component: WorksheetsBillingFormComponent;
  let fixture: ComponentFixture<WorksheetsBillingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetsBillingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetsBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
