import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WebProgramBasic } from '../../models/programs';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramComponent implements OnInit {

  constructor() { }

  @Input()
  program: WebProgramBasic;

  ngOnInit(): void {
  }

}
