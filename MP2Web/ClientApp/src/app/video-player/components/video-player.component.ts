import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';
import { WebFileType, WebMediaItem, WebStringResult } from 'src/app/models/web-media-items';
import { StreamingStreamService } from 'src/app/services/streaming-stream.service';
import { StreamingService } from 'src/app/services/streaming.service';

export enum PlaybackStatus {
  Stopped = 0,
  Starting = 1,
  Started = 2
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  private _mediaItem: WebMediaItem;
  private streamIdentifier: string;

  playbackStatus = PlaybackStatus.Stopped;
  placeholderUrl: string;
  streamUrl: string;

  constructor(private streamingService: StreamingService, private streamingStreamService: StreamingStreamService, appConfig: AppConfigService) {
    this.streamIdentifier = appConfig.appInstanceId;
  }

  ngOnInit(): void {
  }

  async ngOnDestroy() {
    await this.stop();
  }

  get mediaItem() {
    return this._mediaItem;
  }

  @Input()
  set mediaItem(mediaItem: WebMediaItem) {
    this._mediaItem = mediaItem;
    this.placeholderUrl = mediaItem ? this.streamingStreamService.getArtworkResizedUrl(mediaItem.Type, mediaItem.Id, WebFileType.Content, 512, 512, 0) : undefined;
  }

  play() {
    if (this.playbackStatus != PlaybackStatus.Stopped) {
      console.log('Unable to start playback, already playing')
      return;
    }

    this.playbackStatus = PlaybackStatus.Starting;
    this.startStream();
  }

  async stop() {    
    if (this.playbackStatus == PlaybackStatus.Stopped)
      return;

    // If streaming is currently starting, we can't stop it yet.
    // The playback status will be checked again when the stream
    // has started and will be stopped there if necessary.
    let doStop = this.playbackStatus == PlaybackStatus.Started;
    this.playbackStatus = PlaybackStatus.Stopped;
    if (doStop)
      await this.stopStream();
  }

  startStream() {
    this.streamingService.initStream(this._mediaItem.Id, 'MP2-Web', this.streamIdentifier, this._mediaItem.Type, -1).pipe(
      concatMap(r => r.Result ? this.streamingService.startStream(this.streamIdentifier, 'AndroidHLSMQ', 0) : of<WebStringResult>({ Result: null }))
    ).subscribe(r => this.setPlaybackProperties(r.Result));
  }

  async stopStream() {
    await this.streamingService.finishStream(this.streamIdentifier).toPromise();
  }

  setPlaybackProperties(streamUrl: string) {
    if (!streamUrl)
      return;

    // Check if a stop has been requested whilst we were starting the stream
    if (this.playbackStatus == PlaybackStatus.Stopped)
      this.stopStream();
    else {
      this.playbackStatus = PlaybackStatus.Started;
      // MP2Extended returns an absolute url that uses the first IP address that MP2's server is bound to.
      // This may be different to the IP address used to request this site, to avoid CORS issues, trim the
      // url to a relative path, we should be hosted on the same machine so the request will still work.
      let url = new URL(streamUrl);
      this.streamUrl = url.pathname + url.search + '&hls=playlist.m3u8';
    }
  }
}
