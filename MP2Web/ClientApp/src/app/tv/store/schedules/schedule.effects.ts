import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TVAccessService } from '../../services/tv-access.service';
import { updateSchedules, updateSchedulesSuccess } from './schedule.actions';

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
          map(schedules => updateSchedulesSuccess(schedules)),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
