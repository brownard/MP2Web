import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { ApiService } from './api.service';
import { WebFIleType, WebMediaTyoe } from './web-media-items';

@Injectable({
  providedIn: 'root'
})
export class StreamingService extends ApiService {
  constructor(http: HttpClient, config: AppConfigService) {
    super(http, config.appConfig.mp2ExtendedBasePath + config.appConfig.streamingServicePath);
  }

  public getArtworkResizedUrl(mediaType: WebMediaTyoe, id: string, artworkType: WebFIleType, maxWidth: number, maxHeight: number, offset = 0) {
    return this.apiControllerUrl + 'GetArtworkResized' +
      `?mediaType=${mediaType}&id=${id}&artworkType=${artworkType}&maxWidth=${maxWidth}&maxHeight=${maxHeight}&offset=${offset}`;
  }
}
