import { TestBed } from '@angular/core/testing';

import { PopulateFakeBackendService } from './populate-fake-backend.service';

describe('PopulateFakeBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopulateFakeBackendService = TestBed.get(PopulateFakeBackendService);
    expect(service).toBeTruthy();
  });
});
