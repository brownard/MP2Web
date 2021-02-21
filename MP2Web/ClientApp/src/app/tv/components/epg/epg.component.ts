import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Observable, Subscription, timer } from 'rxjs';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebChannelBasic, WebChannelGroup } from '../../models/channels';
import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';
import { WebScheduleBasic } from '../../models/schedules';
import { EpgService } from '../../services/epg.service';
import { SchedulesService } from '../../services/schedules.service';

// Number of milliseconds in 15 minutes, used to round
// the guide time down to the neareest 15 minutes.
const millisecondsIn15Minutes: number = 15 * 60 * 1000;

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

  channels$: Observable<WebChannelBasic[]>;
  programsByChannel$: Observable<Dictionary<WebChannelPrograms<WebProgramBasic>>>;
  schedulesByChannel$: Observable<Dictionary<WebScheduleBasic[]>>;

  currentTime: number;
  subscriptions: Subscription = new Subscription();

  constructor(private epgService: EpgService, private scheduleService: SchedulesService, public artworkService: ArtworkService) {
  }

  async ngOnInit(): Promise<void> {

    this.currentTime = Date.now();

    // Default start time, nearest 15 minutes before current time
    const startTime = this.currentTime - (this.currentTime % millisecondsIn15Minutes);
    const endTime = startTime + this.guideDurationInMinutes * 60000;

    // This sets the initital values of the epg, if they haven't been set previously
    await this.epgService.init(1, startTime, endTime);

    this.groups$ = this.epgService.getTVGroups$();
    this.selectedGroupId$ = this.epgService.getSelectedGroup$();
    this.channels$ = this.epgService.getChannels$();
    this.programsByChannel$ = this.epgService.getGuideEntities$();
    this.schedulesByChannel$ = this.scheduleService.getSchedulesByChannel$();

    this.subscriptions.add(
      this.epgService.getGuideTime$()
        .subscribe(r => {
          this.guideStartTime = r.startTime.getTime();
          this.guideEndTime = r.endTime.getTime();
        })
    );

    this.subscriptions.add(
      timer(0, 30000)
        .subscribe(t => this.currentTime = Date.now())
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
    const start = startTime - (startTime % millisecondsIn15Minutes);
    const end = start + this.guideDurationInMinutes * 60000;
    this.epgService.setGuideTime(new Date(start), new Date(end));
  }
}
