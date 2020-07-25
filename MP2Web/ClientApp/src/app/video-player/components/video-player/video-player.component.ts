import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { WebFileType, WebMediaItem } from 'src/app/core/models/web-media-items';
import { StreamingStreamService } from 'src/app/core/api/streaming-stream.service';
import { PlaybackState } from '../../models/player';
import { PlayerSource } from '../../models/player-source';
import { StreamSource } from '../../models/stream-source';
import { PlayerService } from '../../services/player.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  // Timeout before hiding controls due to inactivity
  private _showControlsTimeoutMs: number = 3000;

  // Handle to the timeout timer, any type is used because the type
  // varies depending on the host environment, it's a NodJs.Timeout
  // in nodeJS and number in a browser.
  private _showControlsTimeoutHandle: any;

  // The media item to play
  private _mediaItem: WebMediaItem;

  // url to the image to use as a placeholder whilst the stream is loading
  placeholderUrl: string;

  // Wrapper for the stream to pass to a player
  playerSource: PlayerSource;

  // True if the player source hasn't been created or initialized yet
  isLoading: boolean;

  /** Whether the controls should remain visible until a call to
   *  doHideControls(), else they are hidden after a timeout. */
  private _forceShowControls: boolean;

  /** Whether to ignore mouse events when deciding whether to keep the controls visible. */
  private _ignoreMouseEvents: boolean = false;

  // Bound to the template to determing whether to show/hide the player controls
  private _showControls: boolean;

  playbackState: PlaybackState = PlaybackState.Stopped;

  get showControls() {
    return this._showControls || this.playbackState !== PlaybackState.Playing;
  }

  constructor(private playerService: PlayerService, private streamingStreamService: StreamingStreamService) {
  }

  ngOnInit(): void {
  }

  async ngOnDestroy(): Promise<void> {
    // Stop transcoding when this component is destroyed
    await this.destroyPlayerSource();
  }

  get mediaItem() {
    return this._mediaItem;
  }

  @Input()
  set mediaItem(mediaItem: WebMediaItem) {
    this._mediaItem = mediaItem;
    this.placeholderUrl = mediaItem ? this.streamingStreamService.getArtworkResizedUrl(mediaItem.Type, mediaItem.Id, WebFileType.Content, 512, 512, 0) : undefined;
  }

  /** Starts streaming the specified media item and sets playerSource to a source that can access the stream. */
  async play(): Promise<void> {
    if (this.isLoading)
      return;
    this.isLoading = true;
    await this.createPlayerSource();
    this.isLoading = false;
  }

  /** Creates a stream source and starts transcoding on the server. */
  private async createPlayerSource(): Promise<void> {
    // Destroy the current source.
    await this.destroyPlayerSource();

    if (!this._mediaItem)
      return;

    // Create a stream source and attempt to start it, this starts transcoding on the server.
    const streamSource = new StreamSource(this.playerService, this._mediaItem);
    if (!await streamSource.initMetadata() || !await streamSource.start())
      return;

    // Updating playersource triggers the player to start playback of the stream.
    this.playerSource = streamSource;
  }

  /** Destroys the current stream source and stops transcoding on the server */
  private async destroyPlayerSource(): Promise<void> {
    if (this.playerSource) {
      await this.playerSource.finish();
      this.playerSource = undefined;
    }
  }

  onPlayerTouchStart(): boolean {
    // If the controls are hidden, just make them
    // visible and prevent any further handling
    const allowDefault = this.showControls;
    this._ignoreMouseEvents = true;
    this.doShowControls(true);
    return allowDefault;
  }

  onPlayerTouchEnd() {
    this.doHideControls();
  }

  onPlayerMouseMove() {
    if (!this._ignoreMouseEvents)
      this.doShowControls(false);
  }

  onControlsMouseEnter() {
    if (!this._ignoreMouseEvents)
      this.doShowControls(true);
  }

  onControlsMouseLeave() {
    if (!this._ignoreMouseEvents)
      this.doHideControls();
  }

  /**
   * Sets showControls to true and optionally starts a timer to set it back to false after a timeout.
   * @param force if true, the controls will be shown until doHideControls is called,
   * else the controls will be hidden after a timeout.
   */
  doShowControls(force: boolean): void {
    setTimeout(() => {
      if (this._showControlsTimeoutHandle !== undefined)
        clearTimeout(this._showControlsTimeoutHandle);

      console.log('Show controls, force: ' + force);

      this._showControls = true;

      if (force)
        this._forceShowControls = true;

      if (!this._forceShowControls)
        this.hideControlsAfterTimeout();
    }, 0);
  }

  /** Hides the controls after a timeout. */
  doHideControls() {
    this._forceShowControls = false;
    this.hideControlsAfterTimeout();
  }

  /** Sets showControls to false after a timeout. */
  private hideControlsAfterTimeout() {

    if (this._showControlsTimeoutHandle !== undefined)
      clearTimeout(this._showControlsTimeoutHandle);

    this._showControlsTimeoutHandle = setTimeout(() => {
      this._showControls = false;
      this._ignoreMouseEvents = false;
    }, this._showControlsTimeoutMs);
  }
}
