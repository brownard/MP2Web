import { createSelector } from "@ngrx/store";

import { scheduleStateSelector } from '../tv.store';

export const getSchedules = createSelector(
  scheduleStateSelector,
  state => state.schedules
);
