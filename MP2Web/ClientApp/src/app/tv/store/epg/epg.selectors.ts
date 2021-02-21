import { createSelector } from "@ngrx/store";

import { epgStateSelector } from '../tv.store';
import { epgProgramAdapter } from './epg.reducers';

const guideSelectors = epgProgramAdapter.getSelectors();

export const getSelectedGroup = createSelector(
  epgStateSelector,
  state => state.selectedGroup
);

export const getGuideTime = createSelector(
  epgStateSelector,
  state => ({ startTime: state.startTime, endTime: state.endTime })
);

export const getGuideState = createSelector(
  epgStateSelector,
  state => ({ selectedGroup: state.selectedGroup, startTime: state.startTime, endTime: state.endTime })
);

export const getGuide = createSelector(
  epgStateSelector,
  state => guideSelectors.selectAll(state)
);

export const getGuideEntities = createSelector(
  epgStateSelector,
  state => guideSelectors.selectEntities(state)
);
