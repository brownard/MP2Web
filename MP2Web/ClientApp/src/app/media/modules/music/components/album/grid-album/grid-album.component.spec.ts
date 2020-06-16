import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAlbumComponent } from './grid-album.component';

describe('GridAlbumComponent', () => {
  let component: GridAlbumComponent;
  let fixture: ComponentFixture<GridAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
