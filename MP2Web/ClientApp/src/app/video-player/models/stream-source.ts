import { PlayerSource } from './player-source';
import { WebMediaInfo } from 'src/app/models/web-stream-items';
import { PlayerService } from '../services/player.service';
import { WebMediaItem } from 'src/app/models/web-media-items';

export class StreamSource implements PlayerSource {

  private _mediaInfo: WebMediaInfo = undefined;
  private _startPosition: number = 0;
  private _streamUrl: string = undefined;

  constructor(private playerService: PlayerService, private mediaItem: WebMediaItem) {
  }

  get durationInSeconds(): number {
    return this._mediaInfo ? this._mediaInfo.Duration / 1000 : 0;
  }

  get startPosition(): number {
    return this._startPosition;
  }

  get streamUrl(): string {
    return this._streamUrl;
  }

  async initMetadata(): Promise<boolean> {
    this._mediaInfo = await this.playerService.getMediaInfo(this.mediaItem).toPromise();
    return !!this._mediaInfo;
  }

  async start(startPosition: number = 0): Promise<boolean> {
    if (this._streamUrl) {
      console.warn('StreamSource: Tried to start an already started stream.');
      return false;
    }

    this._startPosition = startPosition;
    return await this.startStream();
  }

  seek(time: number): Promise<boolean> {
    return this.seekStream(time);
  }

  async finish(): Promise<boolean> {
    const result = await this.finishStream();
    this._streamUrl = undefined;
    this._startPosition = 0;
    return result;
  }

  private async startStream(): Promise<boolean> {
    const result = await this.playerService.startStream(this.mediaItem).toPromise();
    if (!result || !result.Result) {
      console.warn('StreamSource: Unable to start stream.');
      return false;
    }
    this._streamUrl = this.fixStreamUrl(result.Result);
    return true;
  }

  private async finishStream(): Promise<boolean> {
    if (!this._streamUrl)
      return false;
    return await this.playerService.finishStream().toPromise().then(b => b.Result);
  }

  private async seekStream(time: number): Promise<boolean> {
    if (!this._streamUrl) {
      console.warn('StreamSource: Tried to seek before stream started.');
      return false;
    }

    if (time < 0 || time > this.durationInSeconds) {
      console.warn(`StreamSource: Invalid seek time ${time}s for duration ${this.durationInSeconds}s.`);
      return false;
    }

    const result = await this.playerService.setStreamPosition(time).toPromise();
    if (!result || !result.Result) {
      console.warn(`StreamSource: Unable to seek stream to time ${time}.`);
      return false;
    }
    this._startPosition = time;
    this._streamUrl = this.fixStreamUrl(result.Result);
    return true;
  }

  private fixStreamUrl(hlsStreamUrl: string) {
    // MP2Extended returns an absolute url that uses the first IP address that MP2's server is bound to.
    // This may be different to the IP address used to request this site, to avoid CORS issues, trim the
    // url to a relative path, we should be hosted on the same machine so the request will still work.
    return this.getRelativeUrl(hlsStreamUrl) + '&hls=temp_playlist.m3u8';
  }

  private getRelativeUrl(absoluteUrl: string): string {
    const url = new URL(absoluteUrl);
    return url.pathname + url.search;
  }
}
