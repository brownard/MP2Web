import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMovieComponent } from './grid-movie.component';

describe('GridMovieComponent', () => {
  let component: GridMovieComponent;
  let fixture: ComponentFixture<GridMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
