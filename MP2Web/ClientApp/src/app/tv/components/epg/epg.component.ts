import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebChannelGroup } from '../../models/channels';
import { ChannelPrograms, EpgService } from '../../services/epg.service';


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
  guideRows$: Observable<ChannelPrograms[]>;

  currentTime: number;
  currentTimeSubscription: Subscription;

  constructor(private epgService: EpgService, public artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.groups$ = this.epgService.getTVGroups$();

    this.currentTime = Date.now();
    this.currentTimeSubscription = timer(0, 30000)
      .subscribe(t => this.currentTime = Date.now());

    this.updateGuide(Date.now());
  }

  ngOnDestroy(): void {
    this.currentTimeSubscription.unsubscribe();
  }

  get groupId(): number {
    return this.epgService.groupId;
  }

  set groupId(groupId: number) {
    this.epgService.groupId = groupId;
  }

  public moveGuideStartTime(minutes: number) {
    this.updateGuide(this.guideStartTime + (minutes * 60000));
  }

  private updateGuide(startTime: number) {
    // Start time is current time rounded down to nearest 15 minutes
    this.guideStartTime = startTime - (startTime % millisecondsIn15Minutes);
    this.guideEndTime = this.guideStartTime + this.guideDurationInMinutes * 60000;

    this.guideRows$ = this.epgService.getGuide(new Date(this.guideStartTime), new Date(this.guideEndTime));
  }
}
