import { Action, createReducer, on } from '@ngrx/store';
import * as SeriesActions from './series.actions';
import * as SeriesState from './series.state';

const moviesReducer = createReducer(
  SeriesState.initialState,
  on(SeriesActions.setSelectedSeries, (state, { series }) => ({ ...state, selectedSeries: series })),
  // If the series filters are updated, set currentSeries to null so they are reloaded the next time they are requested
  on(SeriesActions.setSeriesFilter, (state, { filter, sort, order }) => ({ ...state, currentFilter: filter, currentSort: sort, currentOrder: order, currentSeries: null })),
  on(SeriesActions.setSeries, (state, { series }) => ({ ...state, currentSeries: series }))
);

export function reducer(state: SeriesState.SeriesState | undefined, action: Action) {
  return moviesReducer(state, action);
}
