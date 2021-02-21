import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';

import { TVAccessService } from '../../services/tv-access.service';
import * as EpgActions from './epg.actions';
import { EpgState } from './epg.reducers';
import * as EpgSelectors from './epg.selectors';

@Injectable()
export class EpgEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private tvAccessService: TVAccessService
  ) { }

  loadGuide = createEffect(() =>
    this.actions$.pipe(
      // Try and update the guide when the group or time has been updated
      ofType(EpgActions.updateGuide),
      // Get the current state from the store
      switchMap(() => this.store.select(EpgSelectors.getGuideState).pipe(
        take(1),
        filter(s => !!s && s.selectedGroup != null && !!s.startTime && !!s.endTime)
      )),
      // Check if the state has actually changed
      distinctUntilChanged(epgStatesAreEqual),
      // Load the channels and programs
      switchMap(s => this.tvAccessService.getProgramsBasicForGroup(s.selectedGroup, s.startTime, s.endTime).pipe(
        take(1),
        map(p => EpgActions.updateGuideSuccess(p)),
        catchError(() => EMPTY)
      ))
    )
  );
}

function epgStatesAreEqual(x: Partial<EpgState>, y: Partial<EpgState>): boolean {
  if (!x || !y)
    return !!x === !!y
  return x.selectedGroup === y.selectedGroup && x.startTime === y.startTime && x.endTime === y.endTime;
}
