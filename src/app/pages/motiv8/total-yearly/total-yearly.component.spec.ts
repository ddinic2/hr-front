import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalYearlyComponent } from './total-yearly.component';

describe('TotalYearlyComponent', () => {
  let component: TotalYearlyComponent;
  let fixture: ComponentFixture<TotalYearlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalYearlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
