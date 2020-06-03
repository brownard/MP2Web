import { TestBed } from '@angular/core/testing';

import { ApiRequestCache } from './api-request.cache';

describe('ApiRequestCacheService', () => {
  let service: ApiRequestCache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRequestCache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
