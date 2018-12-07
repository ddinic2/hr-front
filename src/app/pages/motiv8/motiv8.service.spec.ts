import { TestBed } from '@angular/core/testing';

import { Motiv8Service } from './motiv8.service';

describe('Motiv8Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Motiv8Service = TestBed.get(Motiv8Service);
    expect(service).toBeTruthy();
  });
});
