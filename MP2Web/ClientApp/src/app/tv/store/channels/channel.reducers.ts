import { createReducer, on } from '@ngrx/store';

import { WebChannelBasic, WebChannelGroup, toChannelMap } from '../../models/channels';
import * as Actions from './channel.actions';

export interface ChannelState {
  groups: WebChannelGroup[],
  channels: { [id: number]: WebChannelBasic }
  tvChannels: WebChannelBasic[],
  radioChannels: WebChannelBasic[]
}

const initialState: ChannelState = {
  groups: null,
  channels: {},
  tvChannels: null,
  radioChannels: null
}

export const channelReducer = createReducer(
  initialState,
  on(Actions.setGroups, (state, { groups }) => ({ ...state, groups })),
  on(Actions.setChannels, (state, { channels, channelType }) => channelType === Actions.ChannelType.TV ?
    { ...state, tvChannels: channels } : { ...state, radioChannels: channels }
  ),
  on(Actions.setChannels, (state, { channels }) => ({ ...state, channels: { ...state.channels, ...toChannelMap(channels) } })
  )
);
