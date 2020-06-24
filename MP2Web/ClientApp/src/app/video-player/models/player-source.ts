export interface PlayerSource {

  durationInSeconds: number;
  startPosition: number;
  streamUrl: string;

  initMetadata(): Promise<boolean>;
  start(): Promise<boolean>;
  seek(time: number): Promise<boolean>;
  finish(): Promise<boolean>;
}
