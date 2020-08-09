import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  routes: { name: string, href: string }[] = [
    { name: 'Guide', href: 'guide' },
    { name: 'Schedules', href: '/schedules' },
    { name: 'Recordings', href: '/recordings' }
  ];

  activeRoute = this.routes[0];

  constructor() { }

  ngOnInit(): void {
  }

}
