import { createReducer, on } from '@ngrx/store';
import { setSelectedProgram, setChannelGroups, setSelectedGroupId, setChannels } from './tv.actions';
import { WebProgramBasic } from '../models/programs';
import { WebChannelGroup, WebChannelDetailed } from '../models/channels';

export interface TVState {
  channelGroups: WebChannelGroup[],
  channels: WebChannelDetailed[],
  selectedGroupId: number,
  selectedProgram: WebProgramBasic
}

const initialState: TVState = {
  channelGroups: [],
  channels: [],
  selectedGroupId: 0,
  selectedProgram: null
}

const tvReducer = createReducer(
  this.initialState,
  on(setChannelGroups, (state, { channelGroups }) => ({ ...state, channelGroups })),
  on(setChannels, (state, { channels }) => ({ ...state, channels })),
  on(setSelectedGroupId, (state, { selectedGroupId }) => ({ ...state, selectedGroupId })),
  on(setSelectedProgram, (state, { selectedProgram }) => ({ ...state, selectedProgram }))
);
