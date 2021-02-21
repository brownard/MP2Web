import { createAction } from '@ngrx/store';
import { WebScheduleBasic } from '../../models/schedules';
import { ScheduleSort } from '../../models/schedules.collection';

export const updateSchedules = createAction(
  '[TV Schedules] Update Schedules'
);

export const updateSchedulesSuccess = createAction(
  '[TV Schedules] Update Schedules Success',
  (schedules: WebScheduleBasic[]) => ({ schedules })
);

export const setCurrentSort = createAction(
  '[TV Schedules] Set Current Sort',
  (currentSort: ScheduleSort) => ({ currentSort })
);

export const setShowRepeatedSchedules = createAction(
  '[TV Schedules] Set Show Repeated Schedules',
  (showRepeatedSchedules: boolean) => ({ showRepeatedSchedules })
);
