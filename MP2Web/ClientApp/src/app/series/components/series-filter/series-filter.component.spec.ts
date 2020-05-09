import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesFilterComponent } from './series-filter.component';

describe('SeriesFilterComponent', () => {
  let component: SeriesFilterComponent;
  let fixture: ComponentFixture<SeriesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
