import { MediaMatcher } from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfigService } from './app-config.service';
import { ThemeService } from './services/themes/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // Unused
  title = 'MP2 Web'; 

  // Media query to determine screen width, used
  // to determine whether we are on a mobile device.
  mobileQuery: MediaQueryList;
  isMobile: boolean = false;

  // Bound two-way to the opened state of the mat-sidenav,
  // used to force the menu to stay open when not on mobile.
  isMenuOpen: boolean = false;
  
  private _isDarkMode = false;
  get isDarkMode() { return this._isDarkMode; }

  set isDarkMode(value: boolean) {
    if (this._isDarkMode === value)
      return;
    this._isDarkMode = value;
    this.themeService.setTheme(this._isDarkMode ? 'theme-dark' : '');
  }
  
  constructor(private appConfig: AppConfigService, private themeService: ThemeService, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.onchange = () => this.updateMenuState();
    this.updateMenuState();
  }
  
  ngOnInit(): void {
    this.themeService.initTheme();
    this._isDarkMode = this.themeService.currentTheme == 'theme-dark';
  }

  ngOnDestroy(): void {
    this.mobileQuery.onchange = null;
  }

  updateMenuState() {
    this.isMobile = this.mobileQuery.matches;
    // Keep the menu open on wide screens
    this.isMenuOpen = !this.isMobile;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  closeMenu() {
    if (this.isMobile)
      this.isMenuOpen = false;
  }

  shouldAnimateRoute(outlet: RouterOutlet) {
    return false;
    //return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  // Fallback that tries to stop any ongoing trancoding on the server when the page refreshes/closes
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler($event) {
    let config = this.appConfig.appConfig;
    let url = config.mp2ExtendedBasePath + config.streamingServicePath + 'FinishStream?identifier=' + this.appConfig.appInstanceId;
    let result = fetch(url, { keepalive: true }); //navigator.sendBeacon(url);
    return;
  }
}
