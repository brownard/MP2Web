import { Action, createReducer, on } from '@ngrx/store';
import { setSelectedMovie } from './movies.actions';
import * as moviesState from './movies.state';

const moviesReducer = createReducer(
  moviesState.initialState,
  on(setSelectedMovie, (state, { movie }) => ({ ...state, selectedMovie: movie }))
);

export function reducer(state: moviesState.MoviesState | undefined, action: Action) {
  return moviesReducer(state, action);
}
