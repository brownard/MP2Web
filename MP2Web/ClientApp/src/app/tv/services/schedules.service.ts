import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, combineLatest, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { WebProgramBasic } from '../models/programs';
import { WebScheduleBasic, WebScheduleType } from '../models/schedules';
import { groupByChannelId, ScheduleSort, ScheduleWithChannel } from '../models/schedules.collection';
import * as ScheduleActions from '../store/schedules/schedule.actions';
import * as ScheduleSelectors from '../store/schedules/schedule.selectors';
import { ChannelService } from './channel.service';
import { RateLimiter } from './rate-limiter';
import { TVAccessService } from './tv-access.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  private rateLimiter: RateLimiter = new RateLimiter(300000);
  private schedules$: Observable<WebScheduleBasic[]>;

  constructor(private tvAccessService: TVAccessService, private channelService: ChannelService, private store: Store) { }

  /**
   * Triggers an update of the schedules, regardless of whether they've been updated previously.
   * */
  public init() {
    // Always dispatch the update action, but still
    // tell the rate limiter an update has happened
    this.rateLimiter.tryEnter('schedules');
    this.store.dispatch(ScheduleActions.updateSchedules());
  }

  public getCurrentSort$(): Observable<ScheduleSort> {
    return this.store.select(ScheduleSelectors.getCurrentSort);
  }

  public setCurrentSort(value: ScheduleSort) {
    this.store.dispatch(ScheduleActions.setCurrentSort(value));
  }

  public getShowRepeatedSchedules$(): Observable<boolean> {
    return this.store.select(ScheduleSelectors.getShowRepeatedSchedules);
  }

  public setShowRepeatedSchedules(value: boolean) {
    this.store.dispatch(ScheduleActions.setShowRepeatedSchedules(value));
  }

  public getSchedules$(): Observable<WebScheduleBasic[]> {
    if (this.rateLimiter.tryEnter('schedules'))
      this.store.dispatch(ScheduleActions.updateSchedules());
    if (!this.schedules$)
      this.schedules$ = this.store.select(ScheduleSelectors.getSchedules).pipe(
        filter(s => !!s),
        shareReplay(1)
      );
    return this.schedules$;
  }

  public getSchedulesByChannel$(): Observable<{ [id: number]: WebScheduleBasic[] }> {
    return this.getSchedules$().pipe(
      map(s => groupByChannelId(s))
    );
  }

  public getSchedulesWithChannels$(): Observable<ScheduleWithChannel[]> {
    return this.getSchedules$().pipe(
      combineLatest(this.channelService.getAllChannelEntities()),
      map(([s, c]) => s.map(schedule => ({ schedule, channel: c[schedule.ChannelId] })))
    );
  }

  public getSchedule$(scheduleId: number): Observable<WebScheduleBasic> {
    return this.store.select(ScheduleSelectors.getSchedule(scheduleId)).pipe(
      switchMap(schedule => schedule ? of(schedule) : this.tvAccessService.getScheduleById(scheduleId))
    );
  }

  public getProgramIsScheduled$(programId: string | number): Observable<boolean> {
    return this.tvAccessService.getProgramIsScheduled(programId).pipe(map(r => r && r.Result));
  }

  public addSchedule(program: WebProgramBasic, scheduleType: WebScheduleType = WebScheduleType.Once): Observable<boolean> {
    return this.getProgramIsScheduled$(program.Id).pipe(
      switchMap(isScheduled => isScheduled ? of(false) :
        this.tvAccessService.addSchedule(program.ChannelId, program.Title, new Date(program.StartTime), new Date(program.EndTime), scheduleType)
          .pipe(
            map(r => r && r.Result),
            tap(r => r && this.store.dispatch(ScheduleActions.updateSchedules()))
          )
      ),
      catchError(() => of(false))
    );
  }

  public editSchedule(scheduleId: number, changes: Partial<WebScheduleBasic>): Observable<boolean> {
    if (scheduleId == null || !changes)
      return of(false);

    return this.tvAccessService.editSchedule(scheduleId, changes.ChannelId, changes.Title, changes.StartTime, changes.EndTime,
      changes.ScheduleType, changes.PreRecordInterval, changes.PostRecordInterval, changes.Directory, changes.Priority)
      .pipe(
        map(r => r && r.Result),
        tap(r => r && this.store.dispatch(ScheduleActions.updateSchedules())),
        catchError(() => of(false))
      );
  }

  public cancelSchedule(programId: string | number): Observable<boolean> {
    return this.getProgramIsScheduled$(programId).pipe(
      switchMap(isScheduled => !isScheduled ? of(true) :
        this.tvAccessService.cancelSchedule(programId).pipe(
          map(r => r && r.Result),
          tap(r => r && this.store.dispatch(ScheduleActions.updateSchedules()))
        )
      ),
      catchError(() => of(false))
    );
  }

  public deleteSchedule(scheduleId: number): Observable<boolean> {
    return this.tvAccessService.deleteSchedule(scheduleId).pipe(
      map(r => r && r.Result),
      tap(r => r && this.store.dispatch(ScheduleActions.updateSchedules())),
      catchError(() => of(false))
    );
  }
}
