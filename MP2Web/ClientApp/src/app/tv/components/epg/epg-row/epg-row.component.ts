import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebChannelBasic } from 'src/app/tv/models/channels';
import { WebProgramBasic } from 'src/app/tv/models/programs';
import { WebScheduleBasic } from 'src/app/tv/models/schedules';

@Component({
  selector: 'app-epg-row',
  templateUrl: './epg-row.component.html',
  styleUrls: ['./epg-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpgRowComponent {

  private _programs: WebProgramBasic[];
  private _schedules: WebScheduleBasic[];

  scheduledProgramIds: { [id: number]: boolean } = {};

  constructor(public artworkService: ArtworkService) { }

  hasPrograms: boolean = false;

  @Input()
  startTime: number;

  @Input()
  endTime: number;

  @Input()
  currentTime: number;

  @Input()
  channel: WebChannelBasic;

  get programs(): WebProgramBasic[] {
    return this._programs;
  }

  @Input()
  set programs(programs: WebProgramBasic[]) {
    this._programs = programs;
    this.hasPrograms = programs && programs.length > 0;
    this.scheduledProgramIds = getScheduledProgramIds(this._programs, this._schedules);
  }

  @Input()
  set schedules(schedules: WebScheduleBasic[]) {
    this._schedules = schedules;
    this.scheduledProgramIds = getScheduledProgramIds(this._programs, this._schedules);
  }
}

function getScheduledProgramIds(programs: WebProgramBasic[], schedules: WebScheduleBasic[]): { [id: number]: boolean } {
  if (!programs || !schedules)
    return {};

  const scheduledProgramIds: { [id: number]: boolean } = {};
  for (let program of programs) {
    if (schedules.some(s => isScheduleForProgram(program, s)))
      scheduledProgramIds[program.Id] = true;
  }

  return scheduledProgramIds;
}

function isScheduleForProgram(program: WebProgramBasic, schedule: WebScheduleBasic): boolean {
  if (!program || !schedule)
    return false;
  return program.ChannelId === schedule.ChannelId &&
    new Date(program.StartTime) < new Date(schedule.EndTime) &&
    new Date(program.EndTime) > new Date(schedule.StartTime);
}
