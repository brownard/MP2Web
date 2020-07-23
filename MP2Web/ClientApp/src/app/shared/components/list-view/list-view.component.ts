import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

import { Layout } from './layout.enum';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListViewComponent implements OnInit {

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
