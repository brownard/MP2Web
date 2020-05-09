import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as moviesState from './movies.state';

export const selectMoviesState = createFeatureSelector<any, moviesState.MoviesState>(moviesState.featureKey);

export const selectCurrentFilter = createSelector(
  selectMoviesState,
  (state: moviesState.MoviesState) => {
    return {
      currentFIter: state.currentFilter,
      currentSort: state.currentSort,
      currentOrder: state.currentOrder
    }
  }
);

export const selectCurrentMovies = createSelector(
  selectMoviesState,
  (state: moviesState.MoviesState) => state.currentMovies
);

export const selectSelectedMovie = createSelector(
  selectMoviesState,
  (state: moviesState.MoviesState) => state.selectedMovie
);
