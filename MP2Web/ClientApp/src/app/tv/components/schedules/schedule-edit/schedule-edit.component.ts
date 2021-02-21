import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { concatMap, filter, map, switchMap } from 'rxjs/operators';

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

  @ViewChild("confirmDeleteDialog") confirmDeleteDialog: TemplateRef<any>;

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
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private schedulesService: SchedulesService,
    private channelService: ChannelService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    // Create the form group
    this.createFormControl();

    // Get an observable that gets the schedule id from
    // the route params and loads the schedule and it's channel
    const scheduleParam$ = this.route.paramMap.pipe(
      map(p => +p.get('id')),
      switchMap(id => this.schedulesService.getSchedule$(id)),
      switchMap(schedule => this.channelService.getChannel(schedule.ChannelId).pipe(
        map(channel => ({ schedule, channel })))
      )
    );

    // Subscribe here to keep a local reference to the results to patch the
    // form group and avoid having multiple subscriptions in the template.
    this.subscriptions.add(
      scheduleParam$.subscribe(s => {
        this.schedule = s.schedule;
        this.channel = s.channel;
        this.patchFormControl(s.schedule);
      })
    );

    // Get all channels for the channel select dropdown
    this.channels$ = this.channelService.getChannels(1, WebSortField.Title, WebSortOrder.Asc);
  }

  ngOnDestroy(): void {
    // Unsubscribe
    this.subscriptions.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    // Gets the form group object, including disabled controls
    const value = this.schedulesForm.getRawValue();

    // Validate
    if (!this.schedule || !value.channel || !value.title) {
      this.logger.warn('ScheduleEditComponent: Unable to submit changes, required values are missing.', this.schedule, value);
      return;
    }

    // Try and combine the separate time and date inputs into a valid date
    const start: Date = fromTimeString(value.startDate, value.startTime);
    const end: Date = fromTimeString(value.endDate, value.endTime);
    if (!start || !end) {
      this.logger.warn('ScheduleEditComponent: Unable to submit changes, invalid start or end time.', start, end);
      return;
    }

    await this.schedulesService.editSchedule(this.schedule.Id, {
      ChannelId: value.channel,
      Title: value.title,
      StartTime: start.toJSON(),
      EndTime: end.toJSON(),
      ScheduleType: value.scheduleType
    }).toPromise();
  }

  onCancel(): void {
    if (this.schedule)
      this.patchFormControl(this.schedule);
  }

  onDelete(): void {
    const dialogRef = this.matDialog.open(this.confirmDeleteDialog, { data: this.schedule });
    // If the dialog result is true, delete the schedule and if successful navigate back to the schedules list
    dialogRef.afterClosed().pipe(
      filter(r => !!r && !!this.schedule),
      concatMap(() => this.schedulesService.deleteSchedule(this.schedule.Id))
    ).subscribe(r => {
      if (r)
        this.navigateToSchedules();
    });
  }

  navigateToSchedules(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  /**
   * Creates the form group which gets bound to the html inputs
   * */
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

  /**
   * Updates the form group with the values of the specified WebScheduleBasic.
   * @param schedule The schedule to use to update the values.
   */
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
