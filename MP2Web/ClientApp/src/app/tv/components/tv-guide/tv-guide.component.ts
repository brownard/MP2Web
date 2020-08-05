import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { WebChannelBasic, WebChannelDetailed } from '../../models/channels';
import { WebChannelPrograms, WebProgramBasic } from '../../models/programs';
import { TVAccessService } from '../../services/tv-access.service';


export interface GuideProgramModel {
  program: WebProgramBasic,
  percentOfGuideTime: number
}

export interface GuideRowModel {
  channel: WebChannelBasic,
  programs: GuideProgramModel[]
}

@Component({
  selector: 'app-tv-guide',
  templateUrl: './tv-guide.component.html',
  styleUrls: ['./tv-guide.component.css']
})
export class TvGuideComponent implements OnInit {

  guideStartTime: Date;
  guideDurationInMinutes: number = 60;

  get guideEndTime() {
    const endTime = new Date(this.guideStartTime);
    endTime.setMinutes(endTime.getMinutes() + this.guideDurationInMinutes);
    return endTime;
  }

  groupId: string = '1';
  channels$: Observable<WebChannelDetailed[]>;
  programs$: Observable<WebChannelPrograms<WebProgramBasic>[]>;

  guideRows$: Observable<GuideRowModel[]>;

  constructor(private tvAccessService: TVAccessService) { }

  ngOnInit(): void {

    this.guideStartTime = new Date();

    this.channels$ = this.tvAccessService.getChannelsDetailed(this.groupId);
    this.programs$ = this.tvAccessService.getProgramsBasicForGroup(this.groupId, this.guideStartTime, this.guideEndTime);

    this.guideRows$ = combineLatest(this.channels$, this.programs$).pipe(
      map(([channels, programs]) =>
        channels.map(c => {
          const p = programs.find(p => p.ChannelId === c.Id);
          return { channel: c, programs: p ? this.toGuideProgramModels(p.Programs) : [] };
        }))
    );
  }

  toGuideProgramModels<T extends WebProgramBasic>(programs: T[]): GuideProgramModel[] {

    if (!programs)
      return [];

    const guideStart = this.guideStartTime;
    const guideEnd = this.guideEndTime;
    const guideDuration = this.guideDurationInMinutes * 60000;

    let start: Date;
    let end: Date;

    return programs/*.filter(p => p.StartTime < p.EndTime && p.EndTime > startTime && p.StartTime < endTime)*/
      .map(p => {
        start = new Date(p.StartTime);
        if (start < guideStart)
          start = guideStart;

        end = new Date(p.EndTime);
        if (end > guideEnd)
          end = guideEnd;

        return {
          program: p,
          percentOfGuideTime: 100 * (end.getTime() - start.getTime()) / guideDuration
        };
      });
  };
}
