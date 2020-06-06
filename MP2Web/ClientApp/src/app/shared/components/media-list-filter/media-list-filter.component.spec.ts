import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListFilterComponent } from './media-list-filter.component';

describe('MediaListFilterComponent', () => {
  let component: MediaListFilterComponent;
  let fixture: ComponentFixture<MediaListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
