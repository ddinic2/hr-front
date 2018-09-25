import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbscencesListComponent } from './abscences-list.component';

describe('AbscencesListComponent', () => {
  let component: AbscencesListComponent;
  let fixture: ComponentFixture<AbscencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbscencesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbscencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
