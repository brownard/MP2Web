import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { merge, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PlaybackState, Player } from '../../models/player';


@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.css']
})
export class VideoControlsComponent implements OnInit, OnDestroy {

  // Exposes the enum type to the template so
  // that we can reference the values by name.
  PlaybackState: typeof PlaybackState = PlaybackState;
  
  private _player: Player;

  private _seekTime$: Subject<number> = new Subject<number>();

  playbackState$: Observable<PlaybackState>;
  duration$: Observable<number>;
  currentTime$: Observable<number>;
  volume$: Observable<number>;

  isSeeking: boolean = false;
  private _showVolume: boolean = false;
   
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._seekTime$.complete();
  }

  get player(): Player {
    return this._player;
  }

  @Input()
  set player(value: Player) {
    this._player = value;
    this.playbackState$ = value.playbackState$;
    this.duration$ = value.duration$;
    this.volume$ = value.volume$;

    // When seeking, ignore any player time updates and return seek time updates instead
    this.currentTime$ = merge(value.currentTime$.pipe(filter(() => !this.isSeeking)), this._seekTime$);
  }

  @Input()
  disabled: boolean = false;

  @Input()
  isFullscreen: boolean = false;

  @Output()
  toggleFullscreen: EventEmitter<void> = new EventEmitter();

  onToggleFullscreen() {
    this.toggleFullscreen.emit();
  }

  togglePause() {
    if (this._player)
      this._player.togglePause();
  }

  onSeeking(value: number): void {
    if (!this.isSeeking) {
      this.isSeeking = true;
      if (this._player)
        this._player.pause();
    }
    this._seekTime$.next(value);
  }

  async onSeeked(value: number): Promise<void> {
    this.isSeeking = false;
    if (!this._player)
      return;
    await this._player.seek(value);
    this._player.play();
  }

  toggleMute(): void {
    if (this._player)
      this._player.toggleMute();
  }

  setVolume(volume: number): void {
    if (this._player && this._player.canSetVolume)
      this._player.setVolume(volume);
  }

  get showVolume(): boolean {
    // Don't show the volume slider if disabled or there's a player and it's volume is read only
    return this._showVolume && !this.disabled && (!this._player || this._player.canSetVolume);
  }

  set showVolume(showVolume: boolean) {
    this._showVolume = showVolume;
  }
}
