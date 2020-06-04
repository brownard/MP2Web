import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListBarComponent } from './media-list-bar.component';

describe('MediaListBarComponent', () => {
  let component: MediaListBarComponent;
  let fixture: ComponentFixture<MediaListBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaListBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
