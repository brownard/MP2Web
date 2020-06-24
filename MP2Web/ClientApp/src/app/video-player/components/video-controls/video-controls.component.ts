import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

import { Observable, Subject, merge, Subscription } from 'rxjs';
import { Player, PlaybackState } from '../../models/player';

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

  private _seekTime: number = undefined;
  private _seekTime$: Subject<number> = new Subject<number>();

  playbackState$: Observable<PlaybackState>;
  duration$: Observable<number>;
  currentTime$: Observable<number>;
  volume$: Observable<number>;

  isFullscreen: boolean = false;
  isSeeking: boolean = false;
   
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
    this.currentTime$ = merge(value.currentTime$, this._seekTime$);
  }

  togglePause() {
    if (this._player)
      this._player.togglePause();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  startSeeking(): void {
    this.isSeeking = true;
    this._seekTime = undefined;
    if (this._player)
      this._player.pause();
  }

  onSeekPositionChanged(e: MatSliderChange) {
    if (!this.isSeeking)
      return;
    this._seekTime = e.value;
    this._seekTime$.next(e.value);
  }

  // We need to use the global mouseup event to end seeking because
  // the cursor might not be over the slider when the button is released.
  @HostListener('window:mouseup', ['$event'])
  async endSeeking(): Promise<void> {
    if (!this.isSeeking)
      return;

    this.isSeeking = false;
    if (!this._player || this._seekTime === undefined)
      return;
    await this._player.seek(this._seekTime);
    this._player.play();
  }
}
