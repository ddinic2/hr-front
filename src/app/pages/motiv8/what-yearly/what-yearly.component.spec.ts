import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatYearlyComponent } from './what-yearly.component';

describe('WhatYearlyComponent', () => {
  let component: WhatYearlyComponent;
  let fixture: ComponentFixture<WhatYearlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatYearlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
