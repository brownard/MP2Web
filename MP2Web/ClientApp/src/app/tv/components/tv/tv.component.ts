import { Component } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {

  tabRoutes: { name: string, link: string }[] = [
    { name: 'Guide', link: 'guide' },
    { name: 'Schedules', link: 'schedules' },
    { name: 'Recordings', link: 'recordings' }
  ];

  constructor() {
  }

}
