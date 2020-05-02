import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as moviesState from './movies.state';

export const selectMovies = createFeatureSelector<any, moviesState.MoviesState>(moviesState.featureKey);

export const selectCurrentMovies = createSelector(
  selectMovies,
  (state: moviesState.MoviesState) => state.currentMovies
);

export const selectSelectedMovie = createSelector(
  selectMovies,
  (state: moviesState.MoviesState) => state.selectedMovie
);
