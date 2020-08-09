import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { WebChannelDetailed, WebChannelGroup } from '../models/channels';
import { WebChannelPrograms, WebProgramBasic } from '../models/programs';
import { TVAccessService } from './tv-access.service';


export interface ChannelPrograms {
  channel: WebChannelDetailed,
  programs: WebProgramBasic[]
}

@Injectable({
  providedIn: 'root'
})
export class EpgService {
  
  private _groupId$: BehaviorSubject<number> = new BehaviorSubject(1);
  private _channels$: Observable<WebChannelDetailed[]>;

  constructor(private tvAccessService: TVAccessService) {
    this._channels$ = this._groupId$.pipe(
      distinctUntilChanged(),
      switchMap(g => this.tvAccessService.getChannelsDetailed(g)),
      shareReplay(1)
    );
  }

  public get groupId(): number {
    return this._groupId$.value;
  }

  public set groupId(value: number) {
    this._groupId$.next(value);
  }

  public getTVGroups$(): Observable<WebChannelGroup[]> {
    return this.tvAccessService.getGroups().pipe(
      map(groups => groups.filter(g => g.IsTv))
    );
  }

  public get channels$(): Observable<WebChannelDetailed[]> {
    return this._channels$;
  }

  public getGuide(startTime: Date, endTime: Date): Observable<ChannelPrograms[]> {
    return this.channels$.pipe(
      switchMap(channels => this.tvAccessService.getProgramsBasicForGroup(this._groupId$.value, startTime, endTime).pipe(
        map(programs => this.mapChannelsToPrograms(channels, programs))
      ))
    );
  }

  private mapChannelsToPrograms(channels: WebChannelDetailed[], programs: WebChannelPrograms<WebProgramBasic>[]): ChannelPrograms[] {
    return channels.map(c => {
      const channelPrograms = programs.find(p => p.ChannelId === c.Id);
      return { channel: c, programs: !!channelPrograms && !!channelPrograms.Programs ? channelPrograms.Programs : [] };
    });
  }
}
