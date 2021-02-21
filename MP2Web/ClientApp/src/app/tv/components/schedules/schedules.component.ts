import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

import { WebScheduleBasic, WebScheduleType } from '../../models/schedules';
import { daysAreEqual, ScheduleSort, ScheduleWithChannel, ScheduleWithHeader, sortByChannel, sortByDate } from '../../models/schedules.collection';
import { SchedulesService } from '../../services/schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
  providers: [DatePipe]
})
export class SchedulesComponent implements OnInit {

  // Available schedule sorts
  scheduleSorts = [
    { name: 'Date', value: ScheduleSort.Date },
    { name: 'Channel', value: ScheduleSort.Channel }
  ];

  showSeriesSchedules$: Observable<boolean>;
  currentSort$: Observable<{ name: string, value: ScheduleSort }>;

  schedules$: Observable<ScheduleWithChannel[]>;
  sortedSchedules$: Observable<ScheduleWithHeader[]>;

  constructor(private schedulesService: SchedulesService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.schedules$ = this.schedulesService.getSchedulesWithChannels$();
    this.showSeriesSchedules$ = this.schedulesService.getShowRepeatedSchedules$();
    this.currentSort$ = this.schedulesService.getCurrentSort$().pipe(
      map(sort => this.scheduleSorts.find(s => s.value === sort) || this.scheduleSorts[0])
    );

    this.sortedSchedules$ = this.schedules$.pipe(
      // First filter the schedules based on whether to show series schedules
      combineLatest(this.showSeriesSchedules$),
      map(([schedules, showSeries]) => schedules.filter(s => (s.schedule.ScheduleType === WebScheduleType.Once) !== showSeries)),
      // Then sort by the current sort method
      combineLatest(this.currentSort$),
      map(([schedules, sort]) => this.sortBy(schedules, sort.value))
    );

    this.schedulesService.init();
  }

  setShowSeriesSchedules(value: boolean) {
    this.schedulesService.setShowRepeatedSchedules(value);
  }

  setCurrentSort(value: { name: string, value: ScheduleSort }) {
    this.schedulesService.setCurrentSort(value.value);
  }

  editSchedule(schedule: WebScheduleBasic): Promise<boolean> {
    // TODO
    return null;
  }

  deleteSchedule(schedule: WebScheduleBasic): Promise<boolean> {
    return schedule ? this.schedulesService.deleteSchedule(schedule.Id).toPromise() : Promise.resolve(false);
  }

  private sortBy(schedules: ScheduleWithChannel[], sort: ScheduleSort): ScheduleWithHeader[] {

    if (sort === ScheduleSort.Channel)
      return sortByChannel(schedules);

    else if (sort === ScheduleSort.Date)
      return sortByDate(schedules, date => this.toDisplayDate(date));

    // Default
    return sortByDate(schedules, date => this.toDisplayDate(date));
  }

  private toDisplayDate(date: Date): string {
    if (!date)
      return undefined;

    const today = Date.now();
    if (daysAreEqual(date, new Date(today)))
      return 'Today';
    else if (daysAreEqual(date, new Date(today + (24 * 60 * 60 * 1000))))
      return 'Tomorrow';

    return this.datePipe.transform(date, 'EEEE d LLLL');
  }
}
