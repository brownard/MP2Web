import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MediaAccessService } from '../../services/media-access.service';
import * as SeriesStore from './series.store';

@Injectable()
export class SeriesEffects {

  constructor(private actions$: Actions, private store: Store, private mediaAccessService: MediaAccessService) { }

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeriesStore.SeriesActions.getItems),
      withLatestFrom(this.store.select(SeriesStore.SeriesSelectors.selectState)),
      // Only trigger the action if series aren't already loaded otherwise we might get called
      // recursively as updating the series will cause all bound selectors to run which might
      // then trigger another update
      filter(([action, state]) => !state.currentItems),
      switchMap(([, state]) => this.setSeries(state))
    )
  );

  setSeries(state: SeriesStore.SeriesState) {
    return this.mediaAccessService.getTVShowsDetailed(state.currentFilter, state.currentSort, state.currentOrder).pipe(
      map(series => SeriesStore.SeriesActions.setItems(series)),
      catchError(() => of(SeriesStore.SeriesActions.setItems(null)))
    )
  }
}
