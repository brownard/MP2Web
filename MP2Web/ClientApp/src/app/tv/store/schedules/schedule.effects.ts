import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { SchedulesService } from '../../services/schedules.service';
import { setSchedules, updateSchedules, deleteSchedule } from './schedule.actions';

@Injectable()
export class ScheduleEffects {

  constructor(
    private actions$: Actions,
    private schedulesService: SchedulesService
  ) { }

  updateSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSchedules),
      mergeMap(() => this.schedulesService.getSchedules()
        .pipe(
          map(schedules => setSchedules(schedules)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSchedule),
      switchMap(action => this.schedulesService.deleteSchedule(action.scheduleId)
        .pipe(
          map(() => updateSchedules()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
