import { TestBed } from '@angular/core/testing';

import { Architectural } from './architectural';

describe('Architectural', () => {
  let service: Architectural;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Architectural);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
