import { createSelector } from "@ngrx/store";

import { ChannelType } from '../../models/channels';
import { channelStateSelector } from '../tv.store';
import { channelAdapter, groupAdapter } from './channel.reducers';

// get the entity selectors

const groupSelectors = groupAdapter.getSelectors();
const channelSelectors = channelAdapter.getSelectors();

export const getGroups = (channelType: ChannelType) => createSelector(
  channelStateSelector,
  state => groupSelectors.selectAll(state.groups).filter(g => g.IsTv === (channelType == ChannelType.TV))
);

export const getGroupEntities = createSelector(
  channelStateSelector,
  state => groupSelectors.selectEntities(state.groups)
);

export const getGroup = (id: number) => createSelector(
  getGroupEntities,
  state => state[id]
);

export const getChannels = (channelType: ChannelType) => createSelector(
  channelStateSelector,
  state => channelSelectors.selectAll(state.channels).filter(c => c.IsTv === (channelType == ChannelType.TV))
);

export const getChannelEntities = createSelector(
  channelStateSelector,
  state => channelSelectors.selectEntities(state.channels)
);

export const getChannel = (id: number) => createSelector(
  getChannelEntities,
  state => state[id]
);
