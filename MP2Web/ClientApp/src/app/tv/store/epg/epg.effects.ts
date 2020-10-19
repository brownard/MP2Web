import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EpgService } from '../../services/epg.service';
import * as EpgActions from './epg.actions';
import * as EpgSelectors from './epg.selectors';
import { TVAccessService } from '../../services/tv-access.service';

@Injectable()
export class EpgEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private tvAccessService: TVAccessService
  ) { }

  updateChannelGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpgActions.updateChannelGroups),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(EpgSelectors.getSelectedGroup))
      )),
      switchMap(([, selectedGroup]) => this.tvAccessService.getGroups()
        .pipe(
          map(groups => {
            this.store.dispatch(EpgActions.setChannelGroups(groups));
            return EpgActions.setSelectedGroup(!selectedGroup && groups && groups.length > 0 ? groups[0].Id : selectedGroup)
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setSelectedGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpgActions.setSelectedGroup),
      switchMap(action => this.tvAccessService.getChannelsDetailed(action.selectedGroup)
        .pipe(
          map(channels => EpgActions.setChannels(channels)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  setGuideTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EpgActions.setGuideTime),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(EpgSelectors.getSelectedGroup))
      )),
      switchMap(([action, selectedGroup]) => this.tvAccessService.getProgramsBasicForGroup(selectedGroup, action.startTime, action.endTime)
        .pipe(
          map(programs => EpgActions.setGuidePrograms(programs)),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
