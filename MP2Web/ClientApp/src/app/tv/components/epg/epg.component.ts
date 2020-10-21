import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebChannelDetailed, WebChannelGroup } from '../../models/channels';
import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';
import { EpgService } from '../../services/epg.service';

// Number of milliseconds in 15 minutes, used to round
// the guide time down to the neareest 15 minutes.
const millisecondsIn15Minutes: number = 15 * 60 * 1000;

export interface EpgRow {
  channel: WebChannelDetailed,
  programs: WebProgramBasic[]
}

@Component({
  selector: 'app-epg',
  templateUrl: './epg.component.html',
  styleUrls: ['./epg.component.css']
})
export class EpgComponent implements OnInit, OnDestroy {

  guideStartTime: number;
  guideEndTime: number;
  guideDurationInMinutes: number = 60;

  groups$: Observable<WebChannelGroup[]>;
  selectedGroupId$: Observable<number>;

  channels$: Observable<WebChannelDetailed[]>;
  programs: { [channelId: number]: WebProgramBasic[] };

  epgRows$: Observable<EpgRow[]>;

  currentTime: number;
  subscriptions: Subscription = new Subscription();

  constructor(private epgService: EpgService, public artworkService: ArtworkService) {
    this.groups$ = this.epgService.getTVGroups$();
    this.selectedGroupId$ = this.epgService.getSelectedGroup$();
    this.channels$ = this.epgService.getChannels$();

    this.epgRows$ = this.epgService.getChannels$().pipe(
      combineLatest(this.epgService.getGuide$()),
      map(([channels, programs]) => this.mapChannelsToPrograms(channels, programs))
    );
  }

  ngOnInit(): void {

    this.currentTime = Date.now();
    this.epgService.update();
    this.updateGuide(this.currentTime);

    this.subscriptions.add(
      timer(0, 30000)
        .subscribe(t => this.currentTime = Date.now())
    );

    this.subscriptions.add(this.epgService.getGuide$().pipe(
      map(programs =>
        Object.assign({}, ...programs.map(p => ({ [p.ChannelId]: p.Programs })))
      ))
      .subscribe(p => this.programs = p)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setSelectedGroupId(selectedGroup: number): void {
    this.epgService.setSelectedGroup(selectedGroup);
  }

  public moveGuideStartTime(minutes: number) {
    this.updateGuide(this.guideStartTime + (minutes * 60000));
  }

  private updateGuide(startTime: number) {
    // Start time is current time rounded down to nearest 15 minutes
    this.guideStartTime = startTime - (startTime % millisecondsIn15Minutes);
    this.guideEndTime = this.guideStartTime + this.guideDurationInMinutes * 60000;

    this.epgService.setGuideTime(new Date(this.guideStartTime), new Date(this.guideEndTime));
  }

  private mapChannelsToPrograms(channels: WebChannelDetailed[], programs: WebChannelPrograms<WebProgramBasic>[]): EpgRow[] {
    return channels.map(c => {
      const channelPrograms = programs.find(p => p.ChannelId === c.Id);
      return { channel: c, programs: !!channelPrograms && !!channelPrograms.Programs ? channelPrograms.Programs : [] };
    });
  }
}
