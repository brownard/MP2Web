import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';

import { TVAccessService } from '../../services/tv-access.service';
import { deleteSchedule, setSchedules, updateSchedules } from './schedule.actions';


@Injectable()
export class ScheduleEffects {

  constructor(
    private actions$: Actions,
    private tvAccessService: TVAccessService
  ) { }

  updateSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSchedules),
      mergeMap(() => this.tvAccessService.getSchedules()
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
      concatMap(action => this.tvAccessService.deleteSchedule(action.scheduleId)
        .pipe(
          map(() => updateSchedules()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
