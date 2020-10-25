import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WebChannelBasic } from '../models/channels';
import { WebProgramBasic } from '../models/programs';
import { WebScheduleBasic, WebScheduleType } from '../models/schedules';
import * as ScheduleActions from '../store/schedules/schedule.actions';
import * as ScheduleSelectors from '../store/schedules/schedule.selectors';
import { TVAccessService } from './tv-access.service';

export interface ScheduleWithChannel {
  schedule: WebScheduleBasic;
  channel: WebChannelBasic;
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private tvAccessService: TVAccessService, private store: Store) { }

  public updateSchedules() {
    this.store.dispatch(ScheduleActions.updateSchedules());
  }

  public getSchedules(): Observable<WebScheduleBasic[]> {
    return this.store.select(ScheduleSelectors.getSchedules);
  }

  public getSchedulesWithChannels(): Observable<ScheduleWithChannel[]> {
    return this.getSchedules().pipe(
      switchMap(async s => await this.mapScheduleChannels(s))
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

  private async mapScheduleChannels(schedules: WebScheduleBasic[]): Promise<ScheduleWithChannel[]> {
    const schedulesWithChannels: ScheduleWithChannel[] = [];
    const channels: { [channelId: number]: WebChannelBasic; } = {}

    for (let schedule of schedules) {
      let channel = channels[schedule.ChannelId];
      if (!channel) {
        channel = await this.tvAccessService.getChannelDetailedById(schedule.ChannelId).toPromise();
        channels[schedule.ChannelId] = channel;
      }
      schedulesWithChannels.push({ schedule, channel });
    }

    return schedulesWithChannels;
  }
}
