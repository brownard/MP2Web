import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as SeriesState from './series.state';

export const selectSeriesState = createFeatureSelector<any, SeriesState.SeriesState>(SeriesState.featureKey);

export const selectCurrentFilter = createSelector(
  selectSeriesState,
  (state: SeriesState.SeriesState) => {
    return {
      currentFIter: state.currentFilter,
      currentSort: state.currentSort,
      currentOrder: state.currentOrder
    }
  }
);

export const selectCurrentSeries = createSelector(
  selectSeriesState,
  (state: SeriesState.SeriesState) => state.currentSeries
);

export const selectSelectedSeries = createSelector(
  selectSeriesState,
  (state: SeriesState.SeriesState) => state.selectedSeries
);
