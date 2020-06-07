import { TestBed } from '@angular/core/testing';

import { AbstractMediaService } from './abstract-media.service';

describe('AbstractMediaService', () => {
  let service: AbstractMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
