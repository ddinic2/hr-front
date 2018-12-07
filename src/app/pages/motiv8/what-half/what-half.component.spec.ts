import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatHalfComponent } from './what-half.component';

describe('WhatHalfComponent', () => {
  let component: WhatHalfComponent;
  let fixture: ComponentFixture<WhatHalfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatHalfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatHalfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
