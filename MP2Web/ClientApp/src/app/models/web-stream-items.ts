export interface WebVideoStream {
  Codec: string,
  DisplayAspectRatio: number,
  DisplayAspectRatioString: string,
  Interlaced: boolean,
  Width: number,
  Height: number,
  ID: number,
  Index: number,
}

export interface WebAudioStream {
  Language: string,
  LanguageFull: string,
  Channels: number,
  Codec: string,
  Title: string,
  ID: number,
  Index: number
}

export interface WebSubtitleStream {
  Language: string,
  LanguageFull: string,
  ID: number,
  Index: number,
  Filename: string,
}

export interface WebMediaInfo {
  Duration: number,
  Container: string,
  VideoStreams: WebVideoStream[],
  AudioStreams: WebAudioStream[],
  SubtitleStreams: WebSubtitleStream[]
}
