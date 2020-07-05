import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Custom slider component for use in player controls */
@Component({
  selector: 'app-player-slider',
  templateUrl: './player-slider.component.html',
  styleUrls: ['./player-slider.component.css']
})
export class PlayerSliderComponent {

  constructor() { }

  @Input()
  max: number = 100;

  @Input()
  step: number = 1;

  @Input()
  value: number = 0;

  onInput(value: string) {
    this.value = parseFloat(value);
    this.changing.emit(this.value);
  }

  onChange(value: string) {
    this.value = parseFloat(value);
    this.change.emit(this.value);
  }

  /** Emitted periodically with the current value when the slider is being moved */
  @Output()
  changing: EventEmitter<number> = new EventEmitter();
  
  /** Emitted with the final value when the slider has finished being moved */
  @Output()
  change: EventEmitter<number> = new EventEmitter();
}
