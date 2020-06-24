import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';
import { WebBoolResult, WebMediaItem, WebStringResult } from 'src/app/models/web-media-items';
import { WebMediaInfo } from 'src/app/models/web-stream-items';
import { StreamingService } from 'src/app/services/streaming.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private streamIdentifier: string;

  constructor(private streamingService: StreamingService, appConfig: AppConfigService) {
    this.streamIdentifier = appConfig.appInstanceId;
  }

  public getMediaInfo(mediaItem: WebMediaItem): Observable<WebMediaInfo> {
    return this.streamingService.getMediaInfo(mediaItem.Id, mediaItem.Type);
  }

  public startStream(mediaItem: WebMediaItem): Observable<WebStringResult> {
    return this.streamingService.initStream(mediaItem.Id, 'MP2-Web', this.streamIdentifier, mediaItem.Type, -1).pipe(
      concatMap(r => r.Result ? this.streamingService.startStream(this.streamIdentifier, 'AndroidHLSMQ', 0) : of<WebStringResult>({ Result: null }))
    );
  }

  public setStreamPosition(position: number): Observable<WebStringResult> {
    return this.streamingService.stopStream(this.streamIdentifier).pipe(
      concatMap(r => this.streamingService.startStream(this.streamIdentifier, 'AndroidHLSMQ', position))
    );
  }

  public finishStream(): Observable<WebBoolResult> {
    return this.streamingService.finishStream(this.streamIdentifier);
  }
}
