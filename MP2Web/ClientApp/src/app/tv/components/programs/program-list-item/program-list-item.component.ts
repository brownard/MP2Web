import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WebProgramBasic } from '../../../models/programs';

@Component({
  selector: 'app-program-list-item',
  templateUrl: './program-list-item.component.html',
  styleUrls: ['./program-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramListItemComponent implements OnInit {

  constructor() { }

  @Input()
  program: WebProgramBasic;

  ngOnInit(): void {
  }

}
