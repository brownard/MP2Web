import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { WebFileType, WebMediaItem } from 'src/app/models/web-media-items';
import { StreamingStreamService } from 'src/app/services/streaming-stream.service';
import { PlayerSource } from '../../models/player-source';
import { StreamSource } from '../../models/stream-source';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  
  private _mediaItem: WebMediaItem;

  placeholderUrl: string;
  playerSource: PlayerSource;
  isLoading: boolean;

  constructor(private playerService: PlayerService, private streamingStreamService: StreamingStreamService) {
  }

  ngOnInit(): void {
  }

  async ngOnDestroy(): Promise<void> {
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

  async play(): Promise<void> {

    if (this.isLoading)
      return;
    this.isLoading = true;
    await this.createPlayerSource();
    this.isLoading = false;
  }

  async createPlayerSource(): Promise<void> {
    await this.destroyPlayerSource();

    if (!this._mediaItem)
      return;

    const streamSource = new StreamSource(this.playerService, this._mediaItem);
    if (!await streamSource.initMetadata() || !await streamSource.start())
      return;

    this.playerSource = streamSource;
  }

  async destroyPlayerSource(): Promise<void> {
    if (this.playerSource) {
      await this.playerSource.finish();
      this.playerSource = undefined;
    }
  }
}
