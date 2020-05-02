import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MediaAccessService } from 'src/app/mp2-extended/media-access.service';
import * as MoviesActions from './movies.actions';
import * as MoviesSelectors from './movies.selectors';

@Injectable()
export class MoviesEffects {

  constructor(private actions$: Actions, private store: Store, private mediaAccessService: MediaAccessService) { }

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovies),
      withLatestFrom(this.store.select(MoviesSelectors.selectMovies)),
      filter(([action, state]) =>
        !state.currentMovies || action.filter != state.currentFilter || action.sort != state.currentSort || action.order != state.currentOrder
      ),
      switchMap(([action]) => this.setMovies(action))
    )
  );

  setMovies(action: any) {
    return this.mediaAccessService.getMoviesDetailed(action.filter, action.sort, action.order).pipe(
      map(movies => MoviesActions.setMovies(action.filter, action.sort, action.order, movies)),
      catchError(() => of(MoviesActions.setMovies(action.filter, action.sort, action.order, null)))
    )
  }
}
