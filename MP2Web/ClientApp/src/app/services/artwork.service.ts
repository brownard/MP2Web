import { Injectable } from '@angular/core';
import { StreamingStreamService } from '../services/streaming-stream.service';
import { WebFIleType, WebMediaItem } from '../models/web-media-items';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(private streamingStreamService: StreamingStreamService) {
  }

  public getCoverUrl(mediaItem: WebMediaItem, index = 0) {
    return this.getArtworkUrl(mediaItem, WebFIleType.Cover, index);
  }

  public getScreenshotUrl(mediaItem: WebMediaItem, index = 0) {
    return this.getArtworkUrl(mediaItem, WebFIleType.Content, index);
  }

  getArtworkUrl(mediaItem: WebMediaItem, fileType: WebFIleType, index = 0, maxWidth = 256, maxHeight = 256) {
    return this.streamingStreamService.getArtworkResizedUrl(mediaItem.Type, mediaItem.Id, fileType, maxWidth, maxHeight, index);
  }
}
