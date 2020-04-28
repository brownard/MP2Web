import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPlayer]'
})
export class PlayerDirective {

  constructor(el: ElementRef) { }

}
