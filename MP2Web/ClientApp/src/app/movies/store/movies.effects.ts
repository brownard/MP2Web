import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MediaAccessService } from '../../services/media-access.service';
import * as MoviesStore from './movies.store';

@Injectable()
export class MoviesEffects {

  constructor(private actions$: Actions, private store: Store, private mediaAccessService: MediaAccessService) { }

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesStore.MovieActions.getItems),
      withLatestFrom(this.store.select(MoviesStore.MovieSelectors.selectState)),
      // Only trigger the action if movies aren't already loaded otherwise we might get called
      // recursively as updating the movies will cause all bound selectors to run which might
      // then trigger another update
      filter(([action, state]) => !state.currentItems),
      switchMap(([, state]) => this.setMovies(state))
    )
  );

  setMovies(state: MoviesStore.MoviesState) {
    return this.mediaAccessService.getMoviesDetailed(state.currentFilter, state.currentSort, state.currentOrder).pipe(
      map(movies => MoviesStore.MovieActions.setItems(movies)),
      catchError(() => of(MoviesStore.MovieActions.setItems(null)))
    )
  }
}
