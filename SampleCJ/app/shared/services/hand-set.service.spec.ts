import { TestBed } from '@angular/core/testing';

import { HandSetService } from './hand-set.service';

describe('HandSetService', () => {
  let service: HandSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
