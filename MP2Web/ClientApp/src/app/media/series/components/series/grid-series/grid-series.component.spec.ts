import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSeriesComponent } from './grid-series.component';

describe('GridSeriesComponent', () => {
  let component: GridSeriesComponent;
  let fixture: ComponentFixture<GridSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
