import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';

describe('AlbumService', () => {
  let service: AlbumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
