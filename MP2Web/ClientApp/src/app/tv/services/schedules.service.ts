import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { combineLatest, filter, map, switchMap } from 'rxjs/operators';

import { WebChannelBasic } from '../models/channels';
import { WebProgramBasic } from '../models/programs';
import { WebScheduleBasic, WebScheduleType } from '../models/schedules';
import { ChannelType } from '../store/channels/channel.actions';
import * as ScheduleActions from '../store/schedules/schedule.actions';
import * as ScheduleSelectors from '../store/schedules/schedule.selectors';
import { ChannelService } from './channel.service';
import { TVAccessService } from './tv-access.service';

export interface ScheduleWithChannel {
  schedule: WebScheduleBasic;
  channel: WebChannelBasic;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  protected updateInterval = 300000;
  private lastUpdate: number = 0;

  constructor(private tvAccessService: TVAccessService, private channelService: ChannelService, private store: Store) { }

  public updateSchedules() {
    this.lastUpdate = Date.now();
    this.store.dispatch(ScheduleActions.updateSchedules());
  }

  public getSchedules(): Observable<WebScheduleBasic[]> {

    if (Date.now() - this.lastUpdate > 300000) {
      this.lastUpdate = Date.now();
      this.store.dispatch(ScheduleActions.updateSchedules());
    }
    return this.store.select(ScheduleSelectors.getSchedules).pipe(
      filter(s => !!s)
    );
  }

  public getSchedulesWithChannels(): Observable<ScheduleWithChannel[]> {
    return this.getSchedules().pipe(
      combineLatest(this.channelService.getChannelMap(ChannelType.TV)),
      map(([s, c]) => s.map(schedule => ({ schedule, channel: c[schedule.ChannelId] })))
    );
  }

  public getSchedule(scheduleId: number): Observable<WebScheduleBasic> {
    return this.getSchedules().pipe(
      switchMap(schedules => {
        const schedule = schedules.find(s => s.Id === scheduleId);
        return schedule ? of(schedule) : this.tvAccessService.getScheduleById(scheduleId);
      })
    );
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

  public editSchedule(scheduleId: string | number, channelId?: string | number, title?: string, startTime?: Date, endTime?: Date,
    scheduleType?: WebScheduleType, preRecordInterval?: number, postRecordInterval?: number, directory?: string, priority?: number): Observable<boolean> {

    return this.tvAccessService.editSchedule(scheduleId, channelId, title, startTime, endTime, scheduleType, preRecordInterval, postRecordInterval, directory, priority)
      .pipe(
        map(r => r.Result)
      );
  }

  public cancelSchedule(programId: string | number): Observable<boolean> {
    return this.getProgramIsScheduled(programId).pipe(
      switchMap(isScheduled => !isScheduled ? of(true) :
        this.tvAccessService.cancelSchedule(programId).pipe(map(r => r.Result))
      )
    );
  }

  public deleteSchedule(scheduleId: string | number): void {
    this.store.dispatch(ScheduleActions.deleteSchedule(scheduleId));
  }
}
