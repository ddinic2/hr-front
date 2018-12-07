import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatRequestComponent } from './what-request.component';

describe('WhatRequestComponent', () => {
  let component: WhatRequestComponent;
  let fixture: ComponentFixture<WhatRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
