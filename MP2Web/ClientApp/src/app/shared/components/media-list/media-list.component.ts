import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Layout } from 'src/app/media/store/media.state';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaListComponent implements OnInit {

  constructor() { }

  @Input()
  items: [];

  @Input()
  layout: Layout = Layout.Grid;

  @Input()
  gridItemTemplate: TemplateRef<HTMLElement>;

  @Input()
  listItemTemplate: TemplateRef<HTMLElement>;

  ngOnInit(): void {
  }

}
