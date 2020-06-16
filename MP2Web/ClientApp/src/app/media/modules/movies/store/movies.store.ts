import { Action } from '@ngrx/store';
import { MediaActions } from 'src/app/media/store/media.actions';
import { MediaReducer } from 'src/app/media/store/media.reducers';
import { MediaSelectors } from 'src/app/media/store/media.selectors';
import { MediaState } from 'src/app/media/store/media.state';
import { WebMovieDetailed } from 'src/app/models/web-media-items';

export const featureKey = 'movies';

export class MoviesState extends MediaState<WebMovieDetailed>{ }

export const initialState: MoviesState = new MoviesState();

export const MovieActions = new MediaActions<WebMovieDetailed>(featureKey);
export const MovieSelectors = new MediaSelectors<WebMovieDetailed>(featureKey);

const moviesReducer = new MediaReducer<WebMovieDetailed>(initialState, MovieActions);

export function reducer(state: MoviesState | undefined, action: Action) {
  return moviesReducer.mediaReducer(state, action);
}
