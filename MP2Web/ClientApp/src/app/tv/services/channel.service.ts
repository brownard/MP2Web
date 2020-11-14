import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { ChannelMap, toChannelMap, WebChannelBasic } from '../models/channels';
import { ChannelType, updateChannels } from '../store/channels/channel.actions';
import { getChannels } from '../store/channels/channel.selectors';
import { TVAccessService } from './tv-access.service';
import { WebSortField, WebSortOrder } from 'src/app/core/models/web-media-items';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelCache: { [id: number]: WebChannelBasic } = {};
  protected updateInterval = 300000;
  private lastUpdate: { [channelType: number]: number } = {}

  constructor(private store: Store, private tvAccessService: TVAccessService) { }

  public getChannels(channelType: ChannelType): Observable<WebChannelBasic[]> {

    if (!this.lastUpdate[channelType] || Date.now() - this.lastUpdate[channelType] > this.updateInterval) {
      this.lastUpdate[channelType] = Date.now();
      this.store.dispatch(updateChannels(channelType));
    }

    return this.store.select(getChannels(channelType)).pipe(
      filter(c => !!c)
    );
  }

  public getChannels$(groupId: number, sort: WebSortField | '' = '', order: WebSortOrder | '' = ''): Observable<WebChannelBasic[]> {
    return this.tvAccessService.getChannelsBasic(groupId, sort, order).pipe(
      tap(c => this.cacheChannels(c))
    );
  }

  public getChannel$(channelId: number): Observable<WebChannelBasic> {
    const channel = this.channelCache[channelId];
    if (channel)
      return of(channel);

    return this.tvAccessService.getChannelBasicById(channelId).pipe(
      tap(c => this.cacheChannels([c]))
    );
  }

  public getChannelMap(channelType: ChannelType): Observable<ChannelMap> {
    return this.getChannels(channelType).pipe(
      map(c => toChannelMap(c))
    );
  }

  public getChannel(channelId: number): Observable<WebChannelBasic> {
    return this.getChannelMap(ChannelType.TV).pipe(
      switchMap(c => c[channelId] ? of(c[channelId]) : (
        this.getChannelMap(ChannelType.Radio).pipe(
          switchMap(c => c[channelId] ? of(c[channelId]) : this.tvAccessService.getChannelDetailedById(channelId))
        )))
    );
  }

  private cacheChannels(channels: WebChannelBasic[]): void {
    for (let channel of channels)
      if (channel)
        this.channelCache[channel.Id] = channel;
  }
}
