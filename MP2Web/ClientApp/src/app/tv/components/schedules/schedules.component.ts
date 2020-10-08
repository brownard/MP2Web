import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArtworkService } from 'src/app/core/api/artwork.service';
import { WebScheduleBasic } from '../../models/schedules';
import { SchedulesService } from '../../services/schedules.service';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  schedules$: Observable<WebScheduleBasic[]>;

  constructor(private schedulesService: SchedulesService, public artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.schedules$ = this.schedulesService.getSchedules();
  }

}
