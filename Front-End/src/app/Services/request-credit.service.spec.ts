import { TestBed } from '@angular/core/testing';

import { RequestCreditService } from './request-credit.service';

describe('RequestCreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestCreditService = TestBed.get(RequestCreditService);
    expect(service).toBeTruthy();
  });
});
