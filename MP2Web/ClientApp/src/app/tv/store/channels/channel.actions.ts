import { createAction } from '@ngrx/store';
import { WebChannelBasic, WebChannelGroup } from '../../models/channels';

export const updateGroups = createAction(
  '[TV Channels] Update Groups',
  (force: boolean) => ({ force })
);

export const updateGroupsSuccess = createAction(
  '[TV Channels] Update Groups Success',
  (groups: WebChannelGroup[]) => ({ groups })
);

export const addOrReplaceGroups = createAction(
  '[TV Channels] Add Or Replace Groups',
  (groups: WebChannelGroup[]) => ({ groups })
);

export const updateChannels = createAction(
  '[TV Channels] Update Channels',
  (force: boolean) => ({ force })
);

export const updateChannelsSuccess = createAction(
  '[TV Channels] Update Channels Success',
  (channels: WebChannelBasic[]) => ({ channels })
);

export const addOrReplaceChannels = createAction(
  '[TV Channels] Add Or Replace Channels',
  (channels: WebChannelBasic[]) => ({ channels })
);
