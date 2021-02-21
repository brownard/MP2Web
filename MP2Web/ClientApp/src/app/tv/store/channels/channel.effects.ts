import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ChannelType } from '../../models/channels';
import { TVAccessService } from '../../services/tv-access.service';
import * as ChannelActions from './channel.actions';
import { getChannels, getGroups } from './channel.selectors';


@Injectable()
export class ChannelEffects {

  constructor(
    private actions$: Actions,
    private tvAccessService: TVAccessService,
    private store: Store
  ) { }

  /**
   * On updateGroups actions, if either 'force' is set to true, or the
   * store is currently empty, [re]load the groups from the server.
   */
  updateGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelActions.updateGroups),
      exhaustMap(action => of(action).pipe(
        // See if the store has any groups
        withLatestFrom(this.store.select(getGroups(ChannelType.TV))),
        // Only update if force is true or the store is empty
        filter(([a, g]) => a.force || !g || g.length == 0),
        switchMap(() => this.tvAccessService.getGroups()),
        filter(g => !!g && g.length > 0),
        map(g => ChannelActions.updateGroupsSuccess(g)),
        catchError(() => EMPTY)
      ))
    )
  );

  /**
   * On updateChannels actions, if either 'force' is set to true, or the
   * store is currently empty, [re]load the channels from the server.
   */
  updateChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelActions.updateChannels),
      exhaustMap(action => of(action).pipe(
        // See if the store has any channels
        withLatestFrom(this.store.select(getChannels(ChannelType.TV))),
        // Only update if force is true or the store is empty
        filter(([a, c]) => a.force || !c || c.length == 0),
        switchMap(() => this.tvAccessService.getChannelsBasic()),
        filter(c => !!c && c.length > 0),
        map(c => ChannelActions.updateChannelsSuccess(c)),
        catchError(() => EMPTY)
      ))
    )
  );
}
