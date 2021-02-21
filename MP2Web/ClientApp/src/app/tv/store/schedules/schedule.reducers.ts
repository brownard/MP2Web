import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { WebScheduleBasic } from '../../models/schedules';
import { ScheduleSort } from '../../models/schedules.collection';
import * as Actions from './schedule.actions';

export interface SchedulesState extends EntityState<WebScheduleBasic> {
  // Additional properties defined here
  currentSort: ScheduleSort,
  showRepeatedSchedules: boolean
}

export const adapter: EntityAdapter<WebScheduleBasic> = createEntityAdapter<WebScheduleBasic>({
  selectId: (s) => s.Id
});

const initialState: SchedulesState = adapter.getInitialState({
  // Additional properties initialized here
  currentSort: ScheduleSort.Date,
  showRepeatedSchedules: false
});

export const scheduleReducer = createReducer(
  initialState,

  on(Actions.updateSchedulesSuccess, (state, { schedules }) => adapter.setAll(schedules, state)),

  on(Actions.setCurrentSort, (state, { currentSort }) => ({ ...state, currentSort })),

  on(Actions.setShowRepeatedSchedules, (state, { showRepeatedSchedules }) => ({ ...state, showRepeatedSchedules }))
);
