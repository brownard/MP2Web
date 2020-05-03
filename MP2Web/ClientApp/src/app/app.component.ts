import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AppConfigService } from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'app';

  constructor(private appConfig: AppConfigService) { }

  // Fallback that tries to stop any ongoing trancoding on the server when the page refreshes/closes
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler($event) {
    let config = this.appConfig.appConfig;
    let url = config.mp2ExtendedBasePath + config.streamingServicePath + 'FinishStream?identifier=' + this.appConfig.appInstanceId;
    let result = fetch(url, { keepalive: true }); //navigator.sendBeacon(url);
    return;
  }

  shouldAnimateRoute(outlet: RouterOutlet) {
    return false;
    //return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
