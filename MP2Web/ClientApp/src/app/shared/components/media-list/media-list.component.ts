import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  constructor() { }

  @Input()
  items: [];

  @Input()
  itemContainerClass: string;

  @Input()
  itemTemplate: TemplateRef<HTMLElement>;

  ngOnInit(): void {
  }

}
