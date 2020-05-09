import { Action, createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import * as moviesState from './movies.state';

const moviesReducer = createReducer(
  moviesState.initialState,
  on(MoviesActions.setSelectedMovie, (state, { movie }) => ({ ...state, selectedMovie: movie })),
  // If the movies filters are updated, set currentMovies to null so they are reloaded the next time they are requested
  on(MoviesActions.setMoviesFilter, (state, { filter, sort, order }) => ({ ...state, currentFilter: filter, currentSort: sort, currentOrder: order, currentMovies: null })),
  on(MoviesActions.setMovies, (state, { movies }) => ({ ...state, currentMovies: movies }))
);

export function reducer(state: moviesState.MoviesState | undefined, action: Action) {
  return moviesReducer(state, action);
}
