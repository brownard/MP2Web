import { Action } from '@ngrx/store';
import { MediaActions } from 'src/app/media/store/media.actions';
import { MediaReducer } from 'src/app/media/store/media.reducers';
import { MediaSelectors } from 'src/app/media/store/media.selectors';
import { MediaState } from 'src/app/media/store/media.state';
import { WebTVShowDetailed } from '../../models/web-media-items';

export const featureKey = 'series';

export class SeriesState extends MediaState<WebTVShowDetailed>{ }

export const initialState: SeriesState = new SeriesState();

export const SeriesActions = new MediaActions<WebTVShowDetailed>(featureKey);
export const SeriesSelectors = new MediaSelectors<WebTVShowDetailed>(featureKey);

const seriesReducer = new MediaReducer<WebTVShowDetailed>(initialState, SeriesActions);

export function reducer(state: SeriesState | undefined, action: Action) {
  return seriesReducer.mediaReducer(state, action);
}
