import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpgRowComponent } from './epg-row.component';

describe('EpgRowComponent', () => {
  let component: EpgRowComponent;
  let fixture: ComponentFixture<EpgRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpgRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpgRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
