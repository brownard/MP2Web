import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDetailsComponent } from './season-details.component';

describe('SeasonDetailsComponent', () => {
  let component: SeasonDetailsComponent;
  let fixture: ComponentFixture<SeasonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
