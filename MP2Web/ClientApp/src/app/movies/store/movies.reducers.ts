import { Action, createReducer, on } from '@ngrx/store';
import * as MoviesActions from './movies.actions';
import * as moviesState from './movies.state';

const moviesReducer = createReducer(
  moviesState.initialState,
  on(MoviesActions.setSelectedMovie, (state, { movie }) => ({ ...state, selectedMovie: movie })),
  on(MoviesActions.setMovies, (state, { filter, sort, order, movies }) =>
    ({ ...state, currentFilter: filter, currentSort: sort, currentOrder: order, currentMovies: movies }))
);

export function reducer(state: moviesState.MoviesState | undefined, action: Action) {
  return moviesReducer(state, action);
}
