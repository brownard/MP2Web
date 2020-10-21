import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebChannelBasic } from 'src/app/tv/models/channels';
import { WebProgramBasic } from 'src/app/tv/models/programs';

@Component({
  selector: 'app-epg-row',
  templateUrl: './epg-row.component.html',
  styleUrls: ['./epg-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpgRowComponent {

  private _programs: WebProgramBasic[];

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
  }
}
