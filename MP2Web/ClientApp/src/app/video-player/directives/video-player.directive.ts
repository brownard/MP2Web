import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import * as Hls from 'hls.js';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaybackState, Player } from '../models/player';
import { PlayerSource } from '../models/player-source';


@Directive({
  selector: '[appVideoPlayer]',
  exportAs: 'videoPlayer'
})
export class VideoPlayerDirective implements Player, OnInit, OnDestroy {
  private _element: HTMLVideoElement
  private _source: PlayerSource;

  private _playbackState$: BehaviorSubject<PlaybackState> = new BehaviorSubject(PlaybackState.Stopped);
  private _duration$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _currentTime$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _volume$: BehaviorSubject<number> = new BehaviorSubject(0);

  private hls: Hls

  canSetVolume: boolean = false;

  constructor(el: ElementRef) {
    this._element = el.nativeElement;
  }

  ngOnInit(): void {
    // Checks whether setting the volume is supported and
    // initializes _volume$ with the current volume
    this.checkVolume();
    this.addEventListeners();
  }

  async ngOnDestroy(): Promise<void> {
    await this.destroy();
  }

  get playerSource(): PlayerSource { return this._source; }

  @Input('appVideoPlayer')
  set playerSource(source: PlayerSource) {
    this._source = source;
    if (source) {
      this.setDuration(source.durationInSeconds);
      this.initPlayer(source.streamUrl);
    }
  }

  get playbackState$(): Observable<PlaybackState> {
    return this._playbackState$.asObservable();
  }

  get currentTime$(): Observable<number> {
    return this._currentTime$.pipe(
      map(t => this._source ? this._source.startPosition + t : t)
    );
  }

  get duration$(): Observable<number> {
    return this._duration$.asObservable();
  }

  get volume$(): Observable<number> {
    return this._volume$.asObservable();
  }

  @Output()
  playbackStateChanged: EventEmitter<PlaybackState> = new EventEmitter();

  play(): Promise<void> {
    return this._element.play();
  }

  pause(): void {
    this._element.pause();
  }

  togglePause() {
    if (this._element.paused)
      this.play();
    else
      this.pause();
  }

  toggleMute() {
    this._element.muted = !this._element.muted;
  }

  async seek(time: number): Promise<boolean> {
    if (!this._source || !this.hls) {
      console.warn(`VideoPlayerDirective: Tried to seek when player isn't playing`);
      return false;
    }

    if (time < 0 || time > this._source.durationInSeconds)
      return false;

    // If the seek time is within the times available in the current
    // playlist then we can just seek the player directly
    if (this.trySeekPlayer(time - this._source.startPosition))
      return true;

    // Else we'll need to start a new stream at the specified position
    if (this.hls)
      this.hls.destroy();

    if (!await this._source.seek(time)) {
      return false;
    }

    return await this.initPlayer(this._source.streamUrl);
  }

  setVolume(volume: number): void {
    this._element.volume = volume;
  }

  private initPlayer(sourceUrl: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      if (!Hls.isSupported()) {
        resolve(false);
        return;
      }

      this.hls = new Hls({ debug: false, manifestLoadingTimeOut: 30000 });
      this.hls.loadSource(sourceUrl);
      this.hls.attachMedia(this._element);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('Manifest parsed');
        resolve(this._element.play().then(_ => true));
      });
    });
  }

  private trySeekPlayer(time: number): boolean {
    if (!this.hls || time < 0)
      return false;
    const level = this.hls.levels[this.hls.currentLevel];
    if (!level || level.details.totalduration < time)
      return false;
    this._element.currentTime = time;
    return true;
  }

  private setDuration(duration: number) {
    this._duration$.next(duration);
  }

  private setPlaybackState(playbackState: PlaybackState) {
    this._playbackState$.next(playbackState);
    this.playbackStateChanged.emit(playbackState);
  }

  private setCurrentTime(currentTime: number) {
    this._currentTime$.next(currentTime);
  }

  private setCurrentVolume(volume: number) {
    this._volume$.next(volume);
  }

  private addEventListeners() {
    this._element.addEventListener('play', this.onPlayerPlay);
    this._element.addEventListener('pause', this.onPlayerPause);
    this._element.addEventListener('timeupdate', this.onPlayerTimeUpdate);
    this._element.addEventListener('volumechange', this.onPlayerVolumeChanged);
  }

  private removeEventListeners() {
    this._element.removeEventListener('play', this.onPlayerPlay);
    this._element.removeEventListener('pause', this.onPlayerPause);
    this._element.removeEventListener('timeupdate', this.onPlayerTimeUpdate);
    this._element.removeEventListener('volumechange', this.onPlayerVolumeChanged);
  }

  private onPlayerPlay = () => {
    this.setPlaybackState(PlaybackState.Playing);
  }

  private onPlayerPause = () => {
    this.setPlaybackState(PlaybackState.Paused);
  }

  private onPlayerTimeUpdate = () => {
    this.setCurrentTime(this._element.currentTime);
  }

  private onPlayerVolumeChanged = () => {
    this.setCurrentVolume(this._element.muted ? 0 : this._element.volume);
  }

  private checkVolume() {
    // Set the value of our volume observable to the player volume
    this.onPlayerVolumeChanged();

    // On some devices (like iOS) the volume property is read only, try
    // and detect whether that's the case so we can hide the volume controls.
    const currentVolume = this._element.volume;
    this._element.volume = currentVolume < 0.5 ? currentVolume + 0.1 : currentVolume - 0.1;

    this.canSetVolume = this._element.volume != currentVolume;
    // If it worked, set the player back to the original volume
    if (this.canSetVolume) {
      this._element.volume = currentVolume;
    }
  }

  async destroy() {

    this.removeEventListeners();
    if (this.hls)
      this.hls.destroy();

    this.setPlaybackState(PlaybackState.Stopped);

    this._playbackState$.complete();
    this._duration$.complete();
    this._currentTime$.complete();
    this._volume$.complete();
  }
}
