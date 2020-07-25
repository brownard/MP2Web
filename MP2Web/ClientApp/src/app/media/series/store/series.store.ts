import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { MediaViewStore } from 'src/app/media/media-shared/store/media-view.store';
import { MediaViewState } from 'src/app/media/media-shared/store/media-view.state';
import { WebTVShowDetailed } from 'src/app/core/models/web-media-items';

export const featureKey = 'series';

export interface SeriesNavigationState {
  series: MediaViewState<WebTVShowDetailed>;
}

const selectState = createFeatureSelector<any, SeriesNavigationState>(featureKey);

const selectSeriesNavigationState = createSelector(
  selectState,
  (state: SeriesNavigationState) => state.series
);

export const seriesStore = {
  series: new MediaViewStore<WebTVShowDetailed>(featureKey + '->series', selectSeriesNavigationState)
}

export const reducers: ActionReducerMap<SeriesNavigationState> = {
  series: seriesStore.series.reducer
}
