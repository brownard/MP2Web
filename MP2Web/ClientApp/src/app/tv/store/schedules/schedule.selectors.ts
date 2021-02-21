import { createSelector } from "@ngrx/store";

import { scheduleStateSelector } from '../tv.store';
import { adapter } from './schedule.reducers';

// get the entity selectors
const scheduleSelectors = adapter.getSelectors();

export const getCurrentSort = createSelector(
  scheduleStateSelector,
  state => state.currentSort
);

export const getShowRepeatedSchedules = createSelector(
  scheduleStateSelector,
  state => state.showRepeatedSchedules
);

export const getSchedules = createSelector(
  scheduleStateSelector,
  scheduleSelectors.selectAll
);

export const getScheduleEntities = createSelector(
  scheduleStateSelector,
  scheduleSelectors.selectEntities
);

export const getSchedule = (id: number) => createSelector(
  getScheduleEntities,
  entities => entities[id]
);
