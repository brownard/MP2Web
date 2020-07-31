import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfigService } from '../config/app-config.service';
import { Logger } from '../logging/logger.service';
import { WebFileType, WebMediaType, WebStringResult } from '../models/web-media-items';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class StreamingStreamService extends ApiService {
  constructor(http: HttpClient, logger: Logger, config: AppConfigService) {
    super(http, logger, config.appConfig.mp2ExtendedBasePath + config.appConfig.streamingServiceStreamPath);
  }

  public doStream(type: WebMediaType, provider: number, itemId: string, clientDescription: string, profileName: string, startPosition: number, idleTimeout: number) {
    return this.getData<WebStringResult>('DoStream', {
      'type': type,
      'provider': provider,
      'itemId': itemId,
      'clientDescription': clientDescription,
      'profileName': profileName,
      'startPosition': startPosition,
      'idleTimeout': idleTimeout
    });
  }

  public getArtworkResizedUrl(mediaType: WebMediaType, id: string, artworkType: WebFileType, maxWidth: number, maxHeight: number, offset = 0) {
    return this.apiControllerUrl + 'GetArtworkResized' +
      `?mediaType=${mediaType}&id=${id}&artworkType=${artworkType}&maxWidth=${maxWidth}&maxHeight=${maxHeight}&offset=${offset}`;
  }
}
