import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebScheduleBasic } from '../../models/schedules';
import { SchedulesService } from '../../services/schedules.service';
import * as ScheduleSelectors from '../../store/schedules/schedule.selectors';
import * as ScheduleActions from '../../store/schedules/schedule.actions';

export interface ScheduleContainer<T> {
  schedule: WebScheduleBasic;
  header: T;
}

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules$: Observable<WebScheduleBasic[]>;

  schedulesByDate$: Observable<ScheduleContainer<Date>[]>;


  constructor(private schedulesService: SchedulesService, private store: Store) { }

  ngOnInit(): void {
    this.schedules$ = this.store.select(ScheduleSelectors.getSchedules); // this.schedulesService.getSchedules();
    this.schedulesByDate$ = this.schedules$.pipe(
      map(s => this.schedulesByDate(s))
    );
    this.store.dispatch(ScheduleActions.updateSchedules());
  }

  editSchedule(schedule: WebScheduleBasic): Promise<boolean> {
    // TODO
    return null;
  }

  deleteSchedule(schedule: WebScheduleBasic): void {
    if (schedule)
      this.store.dispatch(ScheduleActions.deleteSchedule(schedule.Id));
  }

  private schedulesByDate(schedules: WebScheduleBasic[]): ScheduleContainer<Date>[] {
    const containers: ScheduleContainer<Date>[] = [];
    let currentHeader: Date = null;
    for (let schedule of schedules) {
      const scheduleDate = new Date(schedule.StartTime);
      let header = new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate()); 
      if (!currentHeader || currentHeader.getTime() !== header.getTime())
        currentHeader = header;
      else
        header = null;
      containers.push({ schedule, header });
    }
    return containers;
  }
}
