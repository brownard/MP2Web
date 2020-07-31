import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfigService } from '../config/app-config.service';
import { Logger } from '../logging/logger.service';
import { WebBoolResult, WebMediaType, WebStringResult } from '../models/web-media-items';
import { WebMediaInfo } from '../models/web-stream-items';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class StreamingService extends ApiService {
  constructor(http: HttpClient, logger: Logger, config: AppConfigService) {
    super(http, logger, config.appConfig.mp2ExtendedBasePath + config.appConfig.streamingServicePath);
  }

  public getMediaInfo(itemId: string, type: WebMediaType) {
    return this.getData<WebMediaInfo>('GetMediaInfo', {
      'itemId': itemId,
      'type': type
    });
  }

  public initStream(itemId: string, clientDescription: string, identifier: string, type: WebMediaType, idleTimeout: number) {
    return this.getData<WebBoolResult>('InitStream', {
      'itemId': itemId,
      'clientDescription': clientDescription,
      'identifier': identifier,
      'type': type,
      'idleTimeout': idleTimeout
    });
  }

  public startStream(identifier: string, profileName: string, startPosition: number) {
    return this.getData<WebStringResult>('StartStream', {
      'identifier': identifier,
      'profileName': profileName,
      'startPosition': startPosition
    });
  }

  public stopStream(identifier: string) {
    return this.getData<WebBoolResult>('StopStream', {
      'identifier': identifier
    });
  }

  public finishStream(identifier: string) {
    return this.getData<WebBoolResult>('FinishStream', {
      'identifier': identifier
    });
  }
}
