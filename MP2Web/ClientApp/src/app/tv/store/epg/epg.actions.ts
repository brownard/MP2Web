import { createAction } from '@ngrx/store';

import { WebChannelDetailed, WebChannelGroup } from '../../models/channels';
import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';

export const updateChannelGroups = createAction(
  '[TV EPG] Update Channel Groups'
);

export const setChannelGroups = createAction(
  '[TV EPG] Set Channel Groups',
  (channelGroups: WebChannelGroup[]) => ({ channelGroups })
);

export const setSelectedGroup = createAction(
  '[TV EPG] Set Selected Group',
  (selectedGroup: number) => ({ selectedGroup })
);

export const setChannels = createAction(
  '[TV EPG] Set Channels',
  (channels: WebChannelDetailed[]) => ({ channels })
);

export const setGuideTime = createAction(
  '[TV EPG] Set Guide Time',
  (startTime: Date, endTime: Date) => ({ startTime, endTime })
);

export const setGuidePrograms = createAction(
  '[TV EPG] Set Guide Programs',
  (programs: WebChannelPrograms<WebProgramBasic>[]) => ({ programs })
);
