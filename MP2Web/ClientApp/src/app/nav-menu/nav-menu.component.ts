import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor() { }

  @Output()
  navLinkClicked: EventEmitter<boolean> = new EventEmitter();

  onNavLinkClicked() {
    this.navLinkClicked.emit(true);
  }
}
