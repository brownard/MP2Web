import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  routes: { name: string, link: string }[] = [
    { name: 'Guide', link: 'guide' },
    { name: 'Schedules', link: 'schedules' },
    { name: 'Recordings', link: 'recordings' }
  ];

  activeRoute = this.routes[0];

  constructor() { }

  ngOnInit(): void {
  }

}
