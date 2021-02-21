import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { WebChannelBasic, WebChannelGroup } from '../../models/channels';
import * as Actions from './channel.actions';

export interface GroupState extends EntityState<WebChannelGroup> {
  // Additional properties defined here
}

export interface ChannelsState extends EntityState<WebChannelBasic> {
  // Additional properties defined here
}

export const groupAdapter: EntityAdapter<WebChannelGroup> = createEntityAdapter<WebChannelGroup>({
  selectId: (g) => g.Id
});

export const channelAdapter: EntityAdapter<WebChannelBasic> = createEntityAdapter<WebChannelBasic>({
  selectId: (c) => c.Id
});

export interface ChannelState {
  groups: GroupState,
  channels: ChannelsState
}

const initialState: ChannelState = {
  groups: groupAdapter.getInitialState(),
  channels: channelAdapter.getInitialState(),
}

export const channelReducer = createReducer(

  initialState,

  on(Actions.updateGroupsSuccess, (state: ChannelState, { groups }) => ({ ...state, groups: groupAdapter.setAll(groups, state.groups) })),

  on(Actions.updateChannelsSuccess, (state: ChannelState, { channels }) => ({ ...state, channels: channelAdapter.setAll(channels, state.channels) })),

  on(Actions.addOrReplaceGroups, (state: ChannelState, { groups }) => ({ ...state, groups: groupAdapter.upsertMany(groups, state.groups) })),

  on(Actions.addOrReplaceChannels, (state: ChannelState, { channels }) => ({ ...state, channels: channelAdapter.upsertMany(channels, state.channels) }))
);
