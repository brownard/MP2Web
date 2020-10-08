export enum WebScheduleKeepMethod {
  UntilSpaceNeeded = 0,
  UntilWatched = 1,
  TillDate = 2,
  Always = 3
}

export enum WebScheduleType {
  // UI: Once
  Once = 0,
  // UI: Every day at this time
  Daily = 1,
  // UI: Every week at this time
  Weekly = 2,
  // UI: Every time on this channel (starttime ignored)
  EveryTimeOnThisChannel = 3,
  // UI: Every time on every channel (starttime ignored)
  EveryTimeOnEveryChannel = 4,
  // UI: Weekends
  Weekends = 5,
  // UI: Weekdays 
  WorkingDays = 6,
  // UI: Weekly on this channel (starttime ignored)
  WeeklyEveryTimeOnThisChannel = 7
}

export interface WebScheduleBasic {
  BitRateMode: number,
  Canceled: string, // Date formatted
  Directory: string,
  DoesUseEpisodeManagement: boolean,
  EndTime: string,
  ChannelId: number,
  ParentScheduleId: number,
  Id: number,
  IsChanged: boolean,
  IsManual: boolean,
  KeepDate: string,
  KeepMethod: WebScheduleKeepMethod,
  MaxAirings: number,
  PostRecordInterval: number,
  PreRecordInterval: number,
  Priority: number,
  Title: string,
  Quality: number,
  QualityType: number,
  RecommendedCard: number,
  ScheduleType: WebScheduleType,
  Series: boolean,
  StartTime: string,
}
