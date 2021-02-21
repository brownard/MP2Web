import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

import { ChannelType, WebChannelBasic, WebChannelGroup } from '../models/channels';
import { WebChannelPrograms, WebProgramBasic, WebProgramDetailed } from '../models/programs';
import { updateGuide } from '../store/epg/epg.actions';
import { EpgState } from '../store/epg/epg.reducers';
import { getGuide, getGuideEntities, getGuideState, getGuideTime, getSelectedGroup } from '../store/epg/epg.selectors';
import { ChannelService } from './channel.service';
import { TVAccessService } from './tv-access.service';

@Injectable({
  providedIn: 'root'
})
export class EpgService {
  
  private channels$: Observable<WebChannelBasic[]>;

  constructor(private tvAccessService: TVAccessService, private channelService: ChannelService, private store: Store) {
  }

  /**
   * Inititializes the epg service with any of the specified properties that haven't already been initialized, if
   * any properties are changed, and all properties are set, then the epg will be updated.
   * @param selectedGroup Id of the group to get the epg for.
   * @param startTime The start time of the epg.
   * @param endTime The end time of the epg.
   */
  public init(selectedGroup: number, startTime: string | number | Date, endTime: string | number | Date): Promise<void> {
    return this.store.select(getGuideState).pipe(
      take(1),
      map(s => {
        if (s.selectedGroup != null && s.startTime && s.endTime)
          return;
        const result: Partial<EpgState> = {};
        if (s.selectedGroup == null)
          result.selectedGroup = selectedGroup;
        if (!s.startTime || !s.endTime) {
          result.startTime = new Date(startTime);
          result.endTime = new Date(endTime);
        }
        this.store.dispatch(updateGuide(result));
      })
    ).toPromise();
  }

  public getTVGroups$(): Observable<WebChannelGroup[]> {
    return this.channelService.getAllGroups(ChannelType.TV);
  }

  public getSelectedGroup$(): Observable<number> {
    return this.store.select(getSelectedGroup);
  }

  public setSelectedGroup(selectedGroup: number): void {
    this.store.dispatch(updateGuide({ selectedGroup }));
  }

  public getChannels$(): Observable<WebChannelBasic[]> {
    if (!this.channels$)
      this.channels$ = this.getSelectedGroup$().pipe(
        switchMap(g => g != null ? this.channelService.getChannels(g) : of(undefined)),
        shareReplay(1)
      );
    return this.channels$;
  }

  public getGuideTime$(): Observable<{ startTime: Date, endTime: Date }> {
    return this.store.select(getGuideTime);
  }

  public setGuideTime(startTime: Date, endTime: Date): void {
    this.store.dispatch(updateGuide({ startTime, endTime }));
  }

  public getGuide$(): Observable<WebChannelPrograms<WebProgramBasic>[]> {
    return this.store.select(getGuide);
  }

  public getGuideEntities$(): Observable<Dictionary<WebChannelPrograms<WebProgramBasic>>> {
    return this.store.select(getGuideEntities);
  }

  public getChannel$(channelId: number): Observable<WebChannelBasic> {
    return this.channelService.getChannel(channelId);
  }

  public getGuideForChannel$(channelId: string | number, startTime: Date, endTime: Date): Observable<WebProgramDetailed[]> {
    return this.tvAccessService.getProgramsDetailedForChannel(channelId, startTime, endTime);
  }

  public getProgram$(programId: number): Observable<WebProgramDetailed> {
    return this.tvAccessService.getProgramDetailedById(programId);
  }
}
