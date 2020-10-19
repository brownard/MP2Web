import { createFeatureSelector, createSelector } from '@ngrx/store';

import { epgReducer, EpgState } from './epg/epg.reducers';
import { scheduleReducer, SchedulesState } from './schedules/schedule.reducers';

export const featureKey = 'tv';

interface TvState {
  schedules: SchedulesState,
  epg: EpgState
}

export const reducer = {
  schedules: scheduleReducer,
  epg: epgReducer
}

const featureSelector = createFeatureSelector<any, TvState>(featureKey);

export const scheduleStateSelector = createSelector(
  featureSelector,
  state => state.schedules
);

export const epgStateSelector = createSelector(
  featureSelector,
  state => state.epg
);
