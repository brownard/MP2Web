import { Injectable } from '@angular/core';
import { StreamingStreamService } from '../services/streaming-stream.service';
import { WebFIleType, WebMediaItem, WebMediaType } from '../models/web-media-items';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(private streamingStreamService: StreamingStreamService) {
  }

  public getMediaItemCoverUrl(mediaItem: WebMediaItem, index = 0) {
    return this.getCoverUrl(mediaItem.Type, mediaItem.Id, index);
  }

  public getCoverUrl(mediaType: WebMediaType, id: string, index = 0) {
    return this.getArtworkUrl(mediaType, id, WebFIleType.Cover, index);
  }

  public getScreenshotUrl(mediaItem: WebMediaItem, index = 0) {
    return this.getArtworkUrl(mediaItem.Type, mediaItem.Id, WebFIleType.Content, index);
  }

  getArtworkUrl(mediaType: WebMediaType, id: string, fileType: WebFIleType, index = 0, maxWidth = 256, maxHeight = 256) {
    return this.streamingStreamService.getArtworkResizedUrl(mediaType, id, fileType, maxWidth, maxHeight, index);
  }
}
