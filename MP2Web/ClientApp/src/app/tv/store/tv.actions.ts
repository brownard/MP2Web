import { createAction } from '@ngrx/store';
import { WebProgramBasic } from '../models/programs';
import { WebChannelGroup, WebChannelDetailed } from '../models/channels';

export const setChannelGroups = createAction(
  '[TV] Set Channel Groups',
  (channelGroups: WebChannelGroup[]) => ({ channelGroups })
);

export const setChannels = createAction(
  '[TV] Set Channels',
  (channels: WebChannelDetailed[]) => ({ channels })
);

export const setSelectedGroupId = createAction(
  '[TV] Set Selected Group Id',
  (selectedGroupId: number) => ({ selectedGroupId })
);

export const setSelectedProgram = createAction(
  '[TV] Set Selected Program',
  (selectedProgram: WebProgramBasic) => ({ selectedProgram })
);
