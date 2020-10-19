import { createSelector } from "@ngrx/store";

import { epgStateSelector } from '../tv.store';

export const getChannelGroups = createSelector(
  epgStateSelector,
  state => state.channelGroups
);

export const getSelectedGroup = createSelector(
  epgStateSelector,
  state => state.selectedGroup
);

export const getChannels = createSelector(
  epgStateSelector,
  state => state.channels
);

export const getGuideTime = createSelector(
  epgStateSelector,
  state => ({ startTime: state.startTime, endTime: state.endTime })
);

export const getPrograms = createSelector(
  epgStateSelector,
  state => state.programs
);
