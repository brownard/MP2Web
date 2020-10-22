import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { Logger } from 'src/app/core/logging/logger.service';
import { WebChannelDetailed } from '../../../models/channels';
import { WebProgramBasic, WebProgramDetailed } from '../../../models/programs';
import { WebScheduleType } from '../../../models/schedules';
import { EpgService } from '../../../services/epg.service';
import { SchedulesService } from '../../../services/schedules.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {

  private updateIsScheduledSubject = new BehaviorSubject<boolean>(true);

  private programId$: Observable<number>;

  channel$: Observable<WebChannelDetailed>;
  program$: Observable<WebProgramDetailed>;
  isScheduled$: Observable<boolean>;

  nextPrograms$: Observable<WebProgramDetailed[]>;

  constructor(
    private epgService: EpgService,
    private schedulesService: SchedulesService,
    private logger: Logger,
    public artworkService: ArtworkService,
    route: ActivatedRoute
  ) {
    // Try and get a valid program id from the 'id' route param
    this.programId$ = route.paramMap.pipe(
      map(paramMap => {
        const id = +paramMap.get('id');
        if (isNaN(id)) {
          logger.warn('ProgramDetailsComponent: Invalid program id ' + id);
          return -1;
        }
        return id;
      })
    );

    // Get the program using the result of the program id observable
    this.program$ = this.programId$.pipe(
      filter(id => id >= 0),
      switchMap(id => {
        // Ordinarily we get here from the epg page and the history state will contain the right program,
        // but we also need to handle when this page is navigated to directly (or the browser is refreshed),
        // in which case we need to load the program from the epgService.
        return history.state.program && history.state.program.Id === id ?
          of<WebProgramDetailed>(history.state.program) : this.epgService.getProgram$(id);
      }),
      shareReplay(1)
    );

    // Load the channel using the program's channel id
    this.channel$ = this.program$.pipe(
      filter(p => !!p),
      switchMap(p => epgService.getChannel$(p.ChannelId))
    );

    // Trigger an update of isScheduled when the subject emits so we can trigger
    // an update after a schedule is added/cancelled
    this.isScheduled$ = this.updateIsScheduledSubject.pipe(
      withLatestFrom(this.program$),
      switchMap(([_, program]) => this.schedulesService.getProgramIsScheduled(program.Id)),
      shareReplay(1)
    );

    this.nextPrograms$ = this.program$.pipe(
      switchMap(program => {
        // Get programs on the same channel for the next 24 hours
        const startTime = new Date(program.EndTime);
        return this.epgService.getGuideForChannel$(program.ChannelId, startTime, new Date(startTime.getTime() + (24 * 60 * 60 * 1000)));
      }),
    );
  }

  ngOnInit(): void {
  }

  async addSchedule(program: WebProgramBasic): Promise<boolean> {
    const result = await this.schedulesService.addSchedule(program, WebScheduleType.Once).toPromise();
    // Update isScheduled observable
    this.updateIsScheduledSubject.next(true);
    return result;
  }

  async cancelSchedule(program: WebProgramBasic): Promise<boolean> {
    const result = await this.schedulesService.cancelSchedule(program.Id).toPromise();
    // Update isScheduled observable
    this.updateIsScheduledSubject.next(true);
    return result;
  }
}
