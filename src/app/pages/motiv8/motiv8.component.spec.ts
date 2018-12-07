import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Motiv8Component } from './motiv8.component';

describe('Motiv8Component', () => {
  let component: Motiv8Component;
  let fixture: ComponentFixture<Motiv8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Motiv8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Motiv8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
