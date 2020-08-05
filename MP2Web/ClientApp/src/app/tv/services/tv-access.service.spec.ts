import { TestBed } from '@angular/core/testing';

import { TVAccessService } from './tv-access.service';

describe('TVAccessService', () => {
  let service: TVAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TVAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
