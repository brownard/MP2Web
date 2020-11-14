import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Logger } from 'src/app/core/logging/logger.service';
import { WebSortField, WebSortOrder } from 'src/app/core/models/web-media-items';
import { WebChannelBasic } from 'src/app/tv/models/channels';
import { WebScheduleBasic, WebScheduleType } from 'src/app/tv/models/schedules';
import { ChannelService } from 'src/app/tv/services/channel.service';
import { SchedulesService } from 'src/app/tv/services/schedules.service';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.component.html',
  styleUrls: ['./schedule-edit.component.css']
})
export class ScheduleEditComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  
  schedule: WebScheduleBasic;
  channel: WebChannelBasic;
  schedulesForm: FormGroup;

  channels$: Observable<WebChannelBasic[]>;

  scheduleTypes: { name: string, value: WebScheduleType }[] = [
    { name: 'Once', value: WebScheduleType.Once },
    { name: 'Daily', value: WebScheduleType.Daily },
    { name: 'Weekly', value: WebScheduleType.Weekly },
    { name: 'Every time on this channel', value: WebScheduleType.EveryTimeOnThisChannel },
    { name: 'Every time on every channel', value: WebScheduleType.EveryTimeOnEveryChannel },
    { name: 'Weekends', value: WebScheduleType.Weekends },
    { name: 'Working days', value: WebScheduleType.WorkingDays },
    { name: 'Weekly every time on this channel', value: WebScheduleType.WeeklyEveryTimeOnThisChannel },
  ];

  constructor(
    private logger: Logger,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private scheduleService: SchedulesService,
    private channelService: ChannelService
  ) { }

  ngOnInit(): void {

    this.createFormControl();

    const scheduleParam$ = this.route.paramMap.pipe(
      // Load the schedule and channel from the id in the route params
      map(p => +p.get('id')),
      switchMap(id => this.scheduleService.getSchedule(id)),
      switchMap(schedule => this.channelService.getChannel$(schedule.ChannelId).pipe(
        map(channel => ({ schedule, channel })))
      )
    );

    this.subscriptions.add(
      scheduleParam$.subscribe(s => {
        this.schedule = s.schedule;
        this.channel = s.channel;
        this.patchFormControl(s.schedule);
      })
    );

    this.channels$ = this.channelService.getChannels$(1, WebSortField.Title, WebSortOrder.Asc);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    const value = this.schedulesForm.getRawValue();


    if (!this.schedule || !value.channel || !value.title) {
      this.logger.warn('ScheduleEditComponent: Unable to submit changes, required values are missing.', this.schedule, value);
      return;
    }

    const start: Date = fromTimeString(value.startDate, value.startTime);
    const end: Date = fromTimeString(value.endDate, value.endTime);
    if (!start || !end) {
      this.logger.warn('ScheduleEditComponent: Unable to submit changes, invalid start or end time.', start, end);
      return;
    }

    await this.scheduleService.editSchedule(this.schedule.Id, value.channel, value.title, start, end, value.scheduleType).toPromise();
  }

  onCancel(): void {
    if (this.schedule)
      this.patchFormControl(this.schedule);
  }

  private createFormControl() {
    this.schedulesForm = this.formBuilder.group({
      channel: ['', [Validators.required]],
      title: ['', [Validators.required]],
      startDate: [{ value: '', disabled: true }, [Validators.required]],
      startTime: ['00:00', [Validators.required]],
      endDate: [{ value: '', disabled: true }, [Validators.required]],
      endTime: ['00:00', [Validators.required]],
      scheduleType: ['', [Validators.required]],
      preRecordInterval: ['', [Validators.required]],
      postRecordInterval: ['', [Validators.required]],
    });
  }

  private patchFormControl(schedule: WebScheduleBasic) {

    const scheduleStart = new Date(schedule.StartTime);
    const scheduleEnd = new Date(schedule.EndTime)

    this.schedulesForm.patchValue({
      channel: schedule.ChannelId,
      title: schedule.Title,
      startDate: scheduleStart,
      startTime: toTimeString(scheduleStart),
      endDate: scheduleEnd,
      endTime: toTimeString(scheduleEnd),
      scheduleType: schedule.ScheduleType,
      preRecordInterval: schedule.PreRecordInterval,
      postRecordInterval: schedule.PostRecordInterval
    });
  }
}

/**
 * Returns a string representation of the time in a Date in the format hh:mm,
 * as required by an input element with type 'time'.
 * Returns undefined if dateTime is falsy.
 * @param date The Date object containing the time.
 */
function toTimeString(date: Date): string {
  if (!date)
    return undefined;
  return ('' + date.getHours()).padStart(2, '0') + ':' + ('' + date.getMinutes()).padStart(2, '0')
}

/**
 * If timeString is in the format hh:mm, returns a new Date object with the specified date and parsed time.
 * Returns undefined if date or timeString are falsy, or the time could not be parsed from timeString.
 * @param date Date object specifying the date.
 * @param timeString String in the format hh:mm specifying the time.
 */
function fromTimeString(date: Date, timeString: string): Date {
  if (!date || !timeString ||!timeString.includes(':'))
    return undefined;
  const time = timeString.split(':');
  if (time.length < 2)
    return undefined;

  const result = new Date(date);
  result.setHours(+time[0], +time[1]);
  return result;
}
