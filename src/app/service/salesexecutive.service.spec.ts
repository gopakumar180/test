import { TestBed } from '@angular/core/testing';

import { SalesexecutiveService } from './salesexecutive.service';

describe('SalesexecutiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesexecutiveService = TestBed.get(SalesexecutiveService);
    expect(service).toBeTruthy();
  });
});
