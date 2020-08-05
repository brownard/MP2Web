export interface WebProgramBasic {
  Title: string,
  Description: string,
  StartTime: string,
  EndTime: string,
  ChannelId: number,
  Id: number,
  DurationInMinutes: number,
  IsScheduled: boolean
}

export interface WebProgramDetailed extends WebProgramBasic {
  Classification: string,
  EpisodeName: string,
  EpisodeNum: string,
  EpisodeNumber: string,
  EpisodePart: string,
  Genre: string,
  HasConflict: boolean,

  IsChanged: boolean,
  IsPartialRecordingSeriesPending: boolean,
  IsRecording: boolean,
  IsRecordingManual: boolean,
  IsRecordingOnce: boolean,
  IsRecordingOncePending: boolean,
  IsRecordingSeries: boolean,
  IsRecordingSeriesPending: boolean,

  Notify: boolean,
  OriginalAirDate: Date,
  ParentalRating: number,
  SeriesNum: string,
  StarRating: number
}

export interface WebChannelPrograms<TProgram extends WebProgramBasic> {
  ChannelId: number;
  Programs: TProgram[]
}
