import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MediaAccessService } from '../../services/media-access.service';
import * as MoviesActions from './movies.actions';
import * as MoviesSelectors from './movies.selectors';
import { MoviesState } from './movies.state';

@Injectable()
export class MoviesEffects {

  constructor(private actions$: Actions, private store: Store, private mediaAccessService: MediaAccessService) { }

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovies),
      withLatestFrom(this.store.select(MoviesSelectors.selectMoviesState)),
      // Only trigger the action if movies aren't already loaded otherwise we might get called
      // recursively as updating the movies will cause all bound selectors to run which might
      // then trigger another update
      filter(([action, state]) => !state.currentMovies),
      switchMap(([, state]) => this.setMovies(state))
    )
  );

  setMovies(state: MoviesState) {
    return this.mediaAccessService.getMoviesDetailed(state.currentFilter, state.currentSort, state.currentOrder).pipe(
      map(movies => MoviesActions.setMovies(movies)),
      catchError(() => of(MoviesActions.setMovies(null)))
    )
  }
}
