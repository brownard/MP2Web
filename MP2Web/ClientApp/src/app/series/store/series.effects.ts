import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MediaAccessService } from '../../services/media-access.service';
import * as SeriesActions from './series.actions';
import * as SeriesSelectors from './series.selectors';
import { SeriesState } from './series.state';

@Injectable()
export class SeriesEffects {

  constructor(private actions$: Actions, private store: Store, private mediaAccessService: MediaAccessService) { }

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SeriesActions.getSeries),
      withLatestFrom(this.store.select(SeriesSelectors.selectSeriesState)),
      // Only trigger the action if series aren't already loaded otherwise we might get called
      // recursively as updating the series will cause all bound selectors to run which might
      // then trigger another update
      filter(([action, state]) => !state.currentSeries),
      switchMap(([, state]) => this.setSeries(state))
    )
  );

  setSeries(state: SeriesState) {
    return this.mediaAccessService.getTVShowsDetailed(state.currentFilter, state.currentSort, state.currentOrder).pipe(
      map(series => SeriesActions.setSeries(series)),
      catchError(() => of(SeriesActions.setSeries(null)))
    )
  }
}
