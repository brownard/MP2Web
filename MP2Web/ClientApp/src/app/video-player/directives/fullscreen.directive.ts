import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

/** Directive that can make an element fullscreen and track the current fullscreen state */
@Directive({
  selector: '[appFullscreen]',
  exportAs: 'fullscreen'
})
export class FullscreenDirective implements OnInit, OnDestroy {

  private _element: any;

  isFullscreen: boolean = false;

  constructor(el: ElementRef) {
    this._element = el.nativeElement;
  }

  ngOnInit(): void {
    this.addFullscreenChangeEventHandlers();
    this.isFullscreen = this.getFullscreenState(document);
  }

  ngOnDestroy(): void {
    this.removeFullscreenChangeEventHandlers();
  }

  async toggleFullscreen(): Promise<void> {
    if (this.isFullscreen)
      await this.exitFullscreen(document);
    else
      await this.requestFullscreen(this._element);
  }

  private async requestFullscreen(element: any): Promise<void> {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    }
  }

  private async exitFullscreen(document: any): Promise<void> {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      await document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    }
    else if (document.msExitFullscreen) {
      await document.msExitFullscreen();
    }
  }

  private getFullscreenState(document: any): boolean {
    return document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
  }

  private addFullscreenChangeEventHandlers() {
    document.addEventListener("fullscreenchange", this.onFullscreenChanged);
    document.addEventListener("webkitfullscreenchange", this.onFullscreenChanged);
    document.addEventListener("mozfullscreenchange", this.onFullscreenChanged);
    document.addEventListener("MSFullscreenChange", this.onFullscreenChanged);
  }

  private removeFullscreenChangeEventHandlers() {
    document.removeEventListener("fullscreenchange", this.onFullscreenChanged);
    document.removeEventListener("webkitfullscreenchange", this.onFullscreenChanged);
    document.removeEventListener("mozfullscreenchange", this.onFullscreenChanged);
    document.removeEventListener("MSFullscreenChange", this.onFullscreenChanged);
  }

  private onFullscreenChanged = () => {
    this.isFullscreen = this.getFullscreenState(document);
  }
}
