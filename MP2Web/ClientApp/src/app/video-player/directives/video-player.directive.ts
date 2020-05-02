import { Directive, ElementRef, Input } from '@angular/core';
import * as Hls from 'hls.js';

@Directive({
  selector: '[appVideoPlayer]'
})
export class VideoPlayerDirective {

  private element: HTMLVideoElement
  private _playerSrc: string;

  hls: Hls

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  get playerSrc() {
    return this._playerSrc;
  }

  @Input('appVideoPlayer')
  set playerSrc(playerSrc: string) {
    this._playerSrc = playerSrc;
    if (this._playerSrc)
      this.establishHlsStream();
  }

  establishHlsStream() {
    if (this.hls)
      this.hls.destroy();

    if (!Hls.isSupported())
      return;

    let videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    this.hls = new Hls();
    this.hls.loadSource(this._playerSrc);
    this.hls.attachMedia(this.element);
    this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
      this.element.play();
    });
  }
}
