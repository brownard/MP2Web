import { WebProgramDetailed } from './programs';

export interface WebChannelBasic {
  Title: string,
  Id: number,
  IsRadio: boolean,
  IsTv: boolean
}

export interface WebChannelDetailed extends WebChannelBasic {
  CurrentProgram: WebProgramDetailed,
  NextProgram: WebProgramDetailed,
  EpgHasGaps: boolean,
  ExternalId: string,
  FreeToAir: number,
  GrabEpg: boolean,
  GroupNames: string[],
  IsChanged: boolean,
  LastGrabTime: Date,
  TimesWatched: number,
  TotalTimeWatched: Date,
  VisibleInGuide: boolean
}

export interface WebChannelGroup {
  GroupName: string,
  Id: number,
  IsChanged: boolean,
  SortOrder: number,
  IsRadio: boolean,
  IsTv: boolean
}
