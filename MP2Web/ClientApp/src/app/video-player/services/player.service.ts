import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, first } from 'rxjs/operators';

import { StreamingService } from 'src/app/core/api/streaming.service';
import { AppConfigService } from 'src/app/core/config/app-config.service';
import { WebBoolResult, WebMediaType, WebStringResult } from 'src/app/core/models/web-media-items';
import { WebMediaInfo } from 'src/app/core/models/web-stream-items';

export interface PlayableItem {
  Id: string,
  Type: WebMediaType
} 

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private streamIdentifier: string;

  constructor(private streamingService: StreamingService, appConfig: AppConfigService) {
    this.streamIdentifier = appConfig.appInstanceId;
  }

  public getMediaInfo(playableItem: PlayableItem): Observable<WebMediaInfo> {
    return this.streamingService.getMediaInfo(playableItem.Id, playableItem.Type)
      .pipe(
        first(),
        catchError(() => of<WebMediaInfo>(undefined))
      );
  }

  public startStream(playableItem: PlayableItem): Observable<WebStringResult> {
    return this.streamingService.initStream(playableItem.Id, 'MP2-Web', this.streamIdentifier, playableItem.Type, -1)
      .pipe(
        concatMap(r => r.Result ? this.streamingService.startStream(this.streamIdentifier, 'AndroidHLSMQ', 0) : of<WebStringResult>({ Result: null })),
        first(),
        catchError(() => of<WebStringResult>(undefined))
      );
  }

  public setStreamPosition(position: number): Observable<WebStringResult> {
    return this.streamingService.stopStream(this.streamIdentifier)
      .pipe(
        concatMap(r => this.streamingService.startStream(this.streamIdentifier, 'AndroidHLSMQ', position)),
        first(),
        catchError(() => of<WebStringResult>(undefined))
      );
  }

  public finishStream(): Observable<WebBoolResult> {
    return this.streamingService.finishStream(this.streamIdentifier)
      .pipe(
        first(),
        catchError(() => of<WebBoolResult>(undefined))
      );
  }
}
