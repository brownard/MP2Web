import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebScheduleBasic } from '../../models/schedules';
import { EpgService } from '../../services/epg.service';
import { SchedulesService, ScheduleWithChannel } from '../../services/schedules.service';

export interface ScheduleWithHeader extends ScheduleWithChannel {
  header: string;
}

function compareChannels(a: ScheduleWithChannel, b: ScheduleWithChannel): number {
  if (!a.channel)
    return !b.channel ? 0 : 1;
  if (!b.channel)
    return -1;

  if (a.channel.Id === b.channel.Id)
    return new Date(a.schedule.StartTime).getTime() - new Date(b.schedule.StartTime).getTime();

  const aTitle = a.channel.Title.toUpperCase();
  const bTitle = b.channel.Title.toUpperCase();

  if (aTitle > bTitle)
    return 1;
  else if (aTitle < bTitle)
    return -1;
  return a.channel.Id - b.channel.Id;
}

function getDay(dateTime: Date): Date {
  return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
}

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
  providers: [DatePipe]
})
export class SchedulesComponent implements OnInit {

  schedules$: Observable<ScheduleWithChannel[]>;

  schedulesByDate$: Observable<ScheduleWithHeader[]>;
  schedulesByChannel$: Observable<ScheduleWithHeader[]>;

  constructor(private schedulesService: SchedulesService, private epgService: EpgService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.schedules$ = this.schedulesService.getSchedulesWithChannels();

    this.schedulesByDate$ = this.schedules$.pipe(
      map(s => this.groupByDate(s))
    );

    this.schedulesByChannel$ = this.schedules$.pipe(
      map(s => this.groupByChannel(s))
    );

    this.schedulesService.updateSchedules();
  }

  editSchedule(schedule: WebScheduleBasic): Promise<boolean> {
    // TODO
    return null;
  }

  deleteSchedule(schedule: WebScheduleBasic): void {
    if (schedule)
      this.schedulesService.deleteSchedule(schedule.Id);
  }

  private groupByDate(schedules: ScheduleWithChannel[]): ScheduleWithHeader[] {
    const containers: ScheduleWithHeader[] = [];
    const today = getDay(new Date(Date.now())).getTime();
    let currentDate: number = null;
    
    for (let schedule of schedules) {

      let header: string;
      let scheduleDate = getDay(new Date(schedule.schedule.StartTime));
      if (!currentDate || currentDate !== scheduleDate.getTime()) {
        currentDate = scheduleDate.getTime();
        if (currentDate === today)
          header = 'Today';
        else if (currentDate === today + (24 * 60 * 60 * 1000))
          header = 'Tomorrow';
        else
          header = this.datePipe.transform(scheduleDate, 'EEEE d LLLL');
      }
      else {
        header = null;
      }

      containers.push({ ...schedule, header });
    }
    return containers;
  }

  private groupByChannel(schedules: ScheduleWithChannel[]): ScheduleWithHeader[] {
    const containers: ScheduleWithHeader[] = [];

    schedules = [...schedules].sort(compareChannels)

    let currentChannelId: number = null;
    for (let schedule of schedules) {

      let header: string;
      if (!currentChannelId || currentChannelId !== schedule.channel.Id) {
        currentChannelId = schedule.channel.Id;
        header = schedule.channel.Title;
      }
      else {
        header = null;
      }

      containers.push({ ...schedule, header });
    }
    return containers;
  }
}
