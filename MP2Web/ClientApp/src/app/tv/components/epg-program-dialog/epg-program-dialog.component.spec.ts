import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpgProgramDialogComponent } from './epg-program-dialog.component';

describe('EpgProgramDialogComponent', () => {
  let component: EpgProgramDialogComponent;
  let fixture: ComponentFixture<EpgProgramDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpgProgramDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpgProgramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
