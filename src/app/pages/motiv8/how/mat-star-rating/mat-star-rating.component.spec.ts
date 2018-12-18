import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatStarRatingComponent } from './mat-star-rating.component';

describe('MatStarRatingComponent', () => {
  let component: MatStarRatingComponent;
  let fixture: ComponentFixture<MatStarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatStarRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
