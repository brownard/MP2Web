import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundArtworkComponent } from './background-artwork.component';

describe('BackgroundArtworkComponent', () => {
  let component: BackgroundArtworkComponent;
  let fixture: ComponentFixture<BackgroundArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
