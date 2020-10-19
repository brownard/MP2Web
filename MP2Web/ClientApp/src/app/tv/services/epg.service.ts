import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebChannelDetailed, WebChannelGroup } from '../models/channels';
import { WebChannelPrograms, WebProgramBasic, WebProgramDetailed } from '../models/programs';
import * as EpgActions from '../store/epg/epg.actions';
import * as EpgSelectors from '../store/epg/epg.selectors';
import { TVAccessService } from './tv-access.service';

@Injectable({
  providedIn: 'root'
})
export class EpgService {

  constructor(private tvAccessService: TVAccessService, private store: Store) {
  }

  public update(): void {
    this.store.dispatch(EpgActions.updateChannelGroups());
  }

  public getTVGroups$(): Observable<WebChannelGroup[]> {
    return this.store.select(EpgSelectors.getChannelGroups).pipe(
      map(groups => groups.filter(g => g.IsTv))
    );
  }

  public getSelectedGroup$(): Observable<number> {
    return this.store.select(EpgSelectors.getSelectedGroup);
  }

  public setSelectedGroup(selectedGroup: number): void {
    this.store.dispatch(EpgActions.setSelectedGroup(selectedGroup));
  }

  public getChannels$(): Observable<WebChannelDetailed[]> {
    return this.store.select(EpgSelectors.getChannels);
  }

  public getGuideTime$(): Observable<{ startTime: Date, endTime: Date }> {
    return this.store.select(EpgSelectors.getGuideTime);
  }

  public setGuideTime(startTime: Date, endTime: Date): void {
    this.store.dispatch(EpgActions.setGuideTime(startTime, endTime));
  }

  public getGuide$(): Observable<WebChannelPrograms<WebProgramBasic>[]> {
    return this.store.select(EpgSelectors.getPrograms);
  }

  public getChannel$(channelId: number): Observable<WebChannelDetailed> {
    return this.tvAccessService.getChannelDetailedById(channelId);
  }

  public getGuideForChannel$(channelId: string | number, startTime: Date, endTime: Date): Observable<WebProgramDetailed[]> {
    return this.tvAccessService.getProgramsDetailedForChannel(channelId, startTime, endTime);
  }

  public getProgram$(programId: number): Observable<WebProgramDetailed> {
    return this.tvAccessService.getProgramDetailedById(programId);
  }
}
