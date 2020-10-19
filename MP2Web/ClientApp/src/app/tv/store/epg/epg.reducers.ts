import { createReducer, on } from '@ngrx/store';

import { WebChannelDetailed, WebChannelGroup } from '../../models/channels';
import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';
import * as Actions from './epg.actions';

export interface EpgState {
  channelGroups: WebChannelGroup[],
  selectedGroup: number,
  channels: WebChannelDetailed[],
  startTime: Date,
  endTime: Date,
  programs: WebChannelPrograms<WebProgramBasic>[]
}

const initialState: EpgState = {
  channelGroups: [],
  selectedGroup: 1,
  channels: [],
  startTime: null,
  endTime: null,
  programs: []
}

export const epgReducer = createReducer(
  initialState,
  on(Actions.setChannelGroups, (state, { channelGroups }) => ({ ...state, channelGroups })),
  on(Actions.setSelectedGroup, (state, { selectedGroup }) => ({ ...state, selectedGroup })),
  on(Actions.setChannels, (state, { channels }) => ({ ...state, channels })),
  on(Actions.setGuideTime, (state, { startTime, endTime }) => ({ ...state, startTime, endTime })),
  on(Actions.setGuidePrograms, (state, { programs }) => ({ ...state, programs }) )
);
