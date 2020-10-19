import { createAction } from '@ngrx/store';
import { WebScheduleBasic } from '../../models/schedules';

export const updateSchedules = createAction(
  '[TV Schedules] Update Schedules'
);

export const setSchedules = createAction(
  '[TV Schedules] Set Schedules',
  (schedules: WebScheduleBasic[]) => ({ schedules })
);

export const deleteSchedule = createAction(
  '[TV Schedules] Delete Schedule',
  (scheduleId: string | number) => ({ scheduleId })
);
