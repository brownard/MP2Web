import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackNavigation]'
})
export class BackNavigationDirective {

  constructor(private location: Location) {
    return;
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
