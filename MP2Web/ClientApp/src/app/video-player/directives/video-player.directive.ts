import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

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

  constructor(el: ElementRef) {
    this._element = el.nativeElement;
    this.addEventListeners();
  }

  ngOnInit(): void {
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
      map(t => t + (this._source ? this._source.startPosition : 0))
    );
  }

  get duration$(): Observable<number> {
    return this._duration$.asObservable();
  }

  get volume$(): Observable<number> {
    return this._volume$.asObservable();
  }

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

  async seek(time: number): Promise<boolean> {
    if (!this._source || !this.hls) {
      console.warn(`VideoPlayerDirective: Tried to seek when player isn't playing`);
      return false;
    }

    if (time < 0 || time > this._source.durationInSeconds)
      return false;

    if (this.trySeekPlayer(time - this._source.startPosition))
      return true;

    this.pause()
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

  private addEventListeners() {
    this._element.addEventListener('play', () => this.onPlayerStateChanged(PlaybackState.Playing));
    this._element.addEventListener('pause', () => this.onPlayerStateChanged(PlaybackState.Paused));
    this._element.addEventListener('timeupdate', () => this.onPlayerTimeChanged(this._element.currentTime));
    this._element.addEventListener('volumechange', () => this.onPlayerVolumeChanged(this._element.volume));
  }

  private setDuration(duration: number) {
    this._duration$.next(duration);
  }

  private onPlayerStateChanged(playbackState: PlaybackState) {
    this._playbackState$.next(playbackState);
  }

  private onPlayerTimeChanged(currentTime: number) {
    this._currentTime$.next(currentTime);
  }

  private onPlayerVolumeChanged(volume: number) {
    this._volume$.next(volume);
  }

  async destroy() {
    if (this.hls)
      this.hls.destroy();

    this.onPlayerStateChanged(PlaybackState.Stopped);

    this._playbackState$.complete();
    this._duration$.complete();
    this._currentTime$.complete();
    this._volume$.complete();
  }
}
