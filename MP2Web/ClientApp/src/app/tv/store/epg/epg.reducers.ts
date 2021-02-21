import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';
import * as Actions from './epg.actions';

export interface EpgState extends EntityState<WebChannelPrograms<WebProgramBasic>> {
  selectedGroup: number,
  startTime: Date,
  endTime: Date,
  // Additional properties defined here
}

export const epgProgramAdapter: EntityAdapter<WebChannelPrograms<WebProgramBasic>> = createEntityAdapter<WebChannelPrograms<WebProgramBasic>>({
  selectId: (p) => p.ChannelId
});

const initialState: EpgState = epgProgramAdapter.getInitialState({
  selectedGroup: 1,
  startTime: null,
  endTime: null
});

export const epgReducer = createReducer(
  initialState,
  on(Actions.updateGuide, (state, { guideState }) => ({ ...state, ...guideState })),
  on(Actions.updateGuideSuccess, (state, { programs }) => epgProgramAdapter.setAll(programs, state))
);
