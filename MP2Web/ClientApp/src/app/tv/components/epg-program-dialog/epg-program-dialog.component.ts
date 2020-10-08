import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebProgramBasic } from '../../models/programs';
import { SchedulesService } from '../../services/schedules.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-epg-program-dialog',
  templateUrl: './epg-program-dialog.component.html',
  styleUrls: ['./epg-program-dialog.component.css']
})
export class EpgProgramDialogComponent implements OnInit {

  program: WebProgramBasic;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private schedulesService: SchedulesService) {
    this.program = data.program;
  }

  ngOnInit(): void {
  }

  public scheduleRecording(): Observable<boolean> {
    return !!this.program ? this.schedulesService.addSchedule(this.program) : null;
  }

}
