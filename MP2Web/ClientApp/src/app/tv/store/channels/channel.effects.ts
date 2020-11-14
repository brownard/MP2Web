import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TVAccessService } from '../../services/tv-access.service';
import * as ChannelActions from './channel.actions';

@Injectable()
export class ChannelEffects {

  constructor(
    private actions$: Actions,
    private tvAccessService: TVAccessService
  ) { }

  updateGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelActions.updateGroups),
      switchMap(() => this.tvAccessService.getGroups()
        .pipe(
          map(groups => ChannelActions.setGroups(groups)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelActions.updateChannels),
      switchMap(action =>
        this.tvAccessService.getChannelsBasic(action.channelType === ChannelActions.ChannelType.TV ? 1 : -1)
          .pipe(
            map(channels => ChannelActions.setChannels(channels, action.channelType)),
            catchError(() => EMPTY)
          )
      )
    )
  );
}
