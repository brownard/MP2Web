import { createReducer, on } from '@ngrx/store';

import { WebScheduleBasic } from '../../models/schedules';
import { setSchedules } from './schedule.actions';

export interface SchedulesState {
  schedules: WebScheduleBasic[];
}

const initialState: SchedulesState = {
  schedules: null
}

export const scheduleReducer = createReducer(
  initialState,
  on(setSchedules, (state, { schedules }) => ({ ...state, schedules }))
);
