import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebMusicTrackDetailed } from 'src/app/models/web-media-items';

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: [
    './list-track.component.css',
    '../../../../shared/styles/media.styles.css'
  ]
})
export class ListTrackComponent implements OnInit {

  private _track: WebMusicTrackDetailed;

  constructor() { }

  ngOnInit(): void {
  }

  public get track() {
    return this._track;
  }

  @Input()
  public set track(value: WebMusicTrackDetailed) {
    this._track = value;
  }

  @Output()
  selected: EventEmitter<WebMusicTrackDetailed> = new EventEmitter();

  public select() {
    this.selected.emit(this._track);
  }
}
