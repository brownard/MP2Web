import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { MediaViewStore } from 'src/app/media/store/media-view.store';
import { MediaState } from 'src/app/media/store/media.state';
import { WebMovieDetailed } from 'src/app/models/web-media-items';

export const featureKey = 'movies';

export interface MoviesNavigationState {
  movies: MediaState<WebMovieDetailed>;
}

const selectState = createFeatureSelector<any, MoviesNavigationState>(featureKey);

const selectMoviesNavigationState = createSelector(
  selectState,
  (state: MoviesNavigationState) => state.movies
);

export const moviesStore = {
  movies: new MediaViewStore<WebMovieDetailed>(featureKey + '->movies', selectMoviesNavigationState)
}

export const reducers: ActionReducerMap<MoviesNavigationState> = {
  movies: moviesStore.movies.reducer
}
