import { createFeatureSelector, createSelector } from '@ngrx/store';

import { channelReducer, ChannelState } from './channels/channel.reducers';
import { EpgState, epgReducer } from './epg/epg.reducers';
import { scheduleReducer, SchedulesState } from './schedules/schedule.reducers';

export const featureKey = 'tv';

interface TvState {
  channels: ChannelState,
  schedules: SchedulesState,
  epg: EpgState
}

export const reducer = {
  channels: channelReducer,
  schedules: scheduleReducer,
  epg: epgReducer
}

const featureSelector = createFeatureSelector<any, TvState>(featureKey);

export const channelStateSelector = createSelector(
  featureSelector,
  state => state.channels
);

export const scheduleStateSelector = createSelector(
  featureSelector,
  state => state.schedules
);

export const epgStateSelector = createSelector(
  featureSelector,
  state => state.epg
);
