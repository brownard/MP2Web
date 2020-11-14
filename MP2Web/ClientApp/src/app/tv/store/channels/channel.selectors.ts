import { createSelector } from "@ngrx/store";

import { channelStateSelector } from '../tv.store';
import { ChannelType } from './channel.actions';

export const getGroups = (channelType: ChannelType) => createSelector(
  channelStateSelector,
  state => state.groups.filter(g => g.IsTv === (channelType === ChannelType.TV))
);

export const getTVChannels = createSelector(
  channelStateSelector,
  state => state.tvChannels
);

export const getRadioChannels = createSelector(
  channelStateSelector,
  state => state.radioChannels
);

export const getChannels = (channelType: ChannelType) =>
  channelType === ChannelType.TV ? getTVChannels : getRadioChannels;
