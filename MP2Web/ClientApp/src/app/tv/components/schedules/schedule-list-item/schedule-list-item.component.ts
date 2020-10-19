import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebScheduleBasic } from 'src/app/tv/models/schedules';

@Component({
  selector: 'app-schedule-list-item',
  templateUrl: './schedule-list-item.component.html',
  styleUrls: ['./schedule-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleListItemComponent implements OnInit {

  constructor(public artworkService: ArtworkService) { }

  @Input()
  schedule: WebScheduleBasic;

  @Output()
  editSchedule: EventEmitter<WebScheduleBasic> = new EventEmitter();

  @Output()
  deleteSchedule: EventEmitter<WebScheduleBasic> = new EventEmitter();

  ngOnInit(): void {
  }

  onEditSchedule() {
    if (this.schedule)
      this.editSchedule.emit(this.schedule);
  }

  onDeleteSchedule() {
    if (this.schedule)
      this.deleteSchedule.emit(this.schedule);
  }

}
