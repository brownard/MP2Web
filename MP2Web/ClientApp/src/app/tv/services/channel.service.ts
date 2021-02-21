import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

import { Logger } from 'src/app/core/logging/logger.service';
import { WebSortField, WebSortOrder } from 'src/app/core/models/web-media-items';
import { ChannelType, WebChannelBasic, WebChannelGroup } from '../models/channels';
import { addOrReplaceChannels, addOrReplaceGroups, updateChannels, updateGroups } from '../store/channels/channel.actions';
import * as ChannelSelectors from '../store/channels/channel.selectors';
import { RateLimiter } from './rate-limiter';
import { TVAccessService } from './tv-access.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  // Limits how often we pull updates from the server. In regular usage groups and channels
  // on the server are relatively static so this is set to a conservative 5 minutes.
  private rateLimiter: RateLimiter = new RateLimiter(300000);

  constructor(private tvAccessService: TVAccessService, private store: Store, private logger: Logger) {
  }

  public getAllGroups(channelType: ChannelType): Observable<WebChannelGroup[]> {
    this.store.dispatch(updateGroups(this.rateLimiter.tryEnter('groups')));
    return this.store.select(ChannelSelectors.getGroups(channelType));
  }

  public getAllChannels(channelType: ChannelType): Observable<WebChannelBasic[]> {
    this.store.dispatch(updateChannels(this.rateLimiter.tryEnter('channels')));
    return this.store.select(ChannelSelectors.getChannels(channelType));
  }

  public getAllChannelEntities(): Observable<{ [id: number]: WebChannelBasic }> {
    this.store.dispatch(updateChannels(this.rateLimiter.tryEnter('channels')));
    return this.store.select(ChannelSelectors.getChannelEntities);
  }

  public getChannels(groupId: number, sort: WebSortField | '' = '', order: WebSortOrder | '' = ''): Observable<WebChannelBasic[]> {
    return this.tvAccessService.getChannelsBasic(groupId, sort, order).pipe(
      tap(c => c && c.length > 0 ? this.store.dispatch(addOrReplaceChannels(c)) : undefined),
      catchError(() => this.handleError<WebChannelBasic[]>(`Error getting channels for group ${groupId}`, [])),
    );
  }

  public getGroup(groupId: number): Observable<WebChannelGroup> {
    return this.store.select(ChannelSelectors.getGroup(groupId)).pipe(
      take(1),
      switchMap(g => g ? of(g) : this.tvAccessService.getGroupById(groupId).pipe(
        tap(g => g ? this.store.dispatch(addOrReplaceGroups([g])) : undefined),
        catchError(() => this.handleError<WebChannelGroup>(`Error getting group ${groupId}`, undefined))
      ))
    );
  }

  public getChannel(channelId: number): Observable<WebChannelBasic> {
    return this.store.select(ChannelSelectors.getChannel(channelId)).pipe(
      take(1),
      switchMap(c => c ? of(c) : this.tvAccessService.getChannelBasicById(channelId).pipe(
        tap(c => c ? this.store.dispatch(addOrReplaceChannels([c])) : undefined),
        catchError(() => this.handleError<WebChannelBasic>(`Error getting channel ${channelId}`, undefined))
      ))
    );
  }

  private handleError<T>(message: string, returnVal?: T): Observable<T> {
    this.logger.error('ChannelService: ' + message);
    return of(returnVal);
  }
}
