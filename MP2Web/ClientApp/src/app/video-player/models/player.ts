import { Observable } from 'rxjs';

export enum PlaybackState {
  Stopped,
  Playing,
  Paused
}

export interface Player {

  playbackState$: Observable<PlaybackState>;
  currentTime$: Observable<number>;
  duration$: Observable<number>;
  volume$: Observable<number>;
  canSetVolume: boolean;

  play(): Promise<void>;
  pause(): void;
  togglePause(): void;
  seek(time: number): Promise<boolean>;

  setVolume(volume: number): void;
  toggleMute(): void;
}
