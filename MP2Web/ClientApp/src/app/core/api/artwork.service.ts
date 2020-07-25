import { Injectable } from '@angular/core';

import { WebFileType, WebMediaType } from '../models/web-media-items';
import { StreamingStreamService } from './streaming-stream.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(private streamingStreamService: StreamingStreamService) {
  }

  getArtworkUrl(mediaType: WebMediaType, id: string, fileType: WebFileType, maxWidth = 256, maxHeight = 256, index = 0) {
    return this.streamingStreamService.getArtworkResizedUrl(mediaType, id, fileType, maxWidth, maxHeight, index);
  }
}
