import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrackComponent } from './list-track.component';

describe('ListTrackComponent', () => {
  let component: ListTrackComponent;
  let fixture: ComponentFixture<ListTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
