import { createAction } from '@ngrx/store';
import { WebChannelBasic, WebChannelGroup } from '../../models/channels';

export enum ChannelType {
  TV = 0,
  Radio = 1
}

export const updateGroups = createAction(
  '[TV Channels] Update Groups'
);

export const setGroups = createAction(
  '[TV Channels] Set Groups',
  (groups: WebChannelGroup[]) => ({ groups })
);

export const updateChannels = createAction(
  '[TV Channels] Update Channeks',
  (channelType: ChannelType) => ({ channelType })
);

export const setChannels = createAction(
  '[TV Channels] Set Channeks',
  (channels: WebChannelBasic[], channelType: ChannelType) => ({ channels, channelType })
);
