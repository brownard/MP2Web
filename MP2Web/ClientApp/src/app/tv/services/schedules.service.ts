import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WebProgramBasic } from '../models/programs';
import { WebScheduleBasic, WebScheduleType } from '../models/schedules';
import { TVAccessService } from './tv-access.service';


@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private tvAccessService: TVAccessService) { }

  public getSchedules(): Observable<WebScheduleBasic[]> {
    return this.tvAccessService.getSchedules();
  }

  public getProgramIsScheduled(programId: string | number): Observable<boolean> {
    return this.tvAccessService.getProgramIsScheduled(programId).pipe(map(r => r.Result));
  }

  public addSchedule(program: WebProgramBasic, scheduleType: WebScheduleType = WebScheduleType.Once): Observable<boolean> {
    return this.getProgramIsScheduled(program.Id).pipe(
      switchMap(isScheduled => isScheduled ? of(true) :
        this.tvAccessService.addSchedule(program.ChannelId, program.Title, new Date(program.StartTime), new Date(program.EndTime), scheduleType)
          .pipe(map(r => r.Result))
      )
    );
  }

  public cancelSchedule(programId: string | number): Observable<boolean> {
    return this.getProgramIsScheduled(programId).pipe(
      switchMap(isScheduled => !isScheduled ? of(true) :
        this.tvAccessService.cancelSchedule(programId).pipe(map(r => r.Result))
      )
    );
  }

  public deleteSchedule(scheduleId: string | number): Observable<boolean> {
    return this.tvAccessService.deleteSchedule(scheduleId).pipe(map(r => r.Result));
  }
}
