import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvGuideComponent } from './tv-guide.component';

describe('TvGuideComponent', () => {
  let component: TvGuideComponent;
  let fixture: ComponentFixture<TvGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
