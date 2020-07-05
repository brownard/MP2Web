import { PlayerSource } from './player-source';
import { WebMediaInfo } from 'src/app/models/web-stream-items';
import { PlayerService } from '../services/player.service';
import { WebMediaItem } from 'src/app/models/web-media-items';

export class StreamSource implements PlayerSource {

  private _mediaInfo: WebMediaInfo = undefined;
  private _startPosition: number = 0;
  private _streamUrl: string = undefined;

  private _isBusy: boolean = false;
  private _doFinish: boolean = false;

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
    // Check if we are a;ready starting or started
    if (this._isBusy || this._streamUrl) {
      console.warn('StreamSource: Tried to start an already started stream.');
      return false;
    }

    this._isBusy = true;
    this._startPosition = startPosition;
    const result = await this.startStream();
    this._isBusy = false;

    // A finish might have been requested whilst startStream was awaited above
    if (this._doFinish) {
      await this.finish();
      return false;
    }

    return result;
  }

  async seek(time: number): Promise<boolean> {
    // Only seek if we have a stream and aren't already seeking
    if (!this._streamUrl || this._isBusy) {
      return false;
    }

    this._isBusy = true;
    const result = await this.seekStream(time);
    this._isBusy = false;

    // A finish might have been requested whilst startStream was awaited above
    if (this._doFinish) {
      await this.finish();
      return false;
    }

    return result;
  }

  async finish(): Promise<boolean> {
    // We need to wait for any async operations to complete before
    // finishing to ensure the stream is in a consistent state.
    if (this._isBusy) {
      this._doFinish = true;
      return false;
    }

    // Setting isBusy prevents calls to start and
    // seek whilst the stream is finishing.
    this._isBusy = true;
    const result = await this.finishStream();
    this._isBusy = false;

    this._doFinish = false;
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

    this._startPosition = time;
    const result = await this.playerService.setStreamPosition(time).toPromise();
    if (!result || !result.Result) {
      console.warn(`StreamSource: Unable to seek stream to time ${time}.`);
      return false;
    }
    this._streamUrl = this.fixStreamUrl(result.Result);
    return true;
  }

  private fixStreamUrl(hlsStreamUrl: string) {
    // MP2Extended returns an absolute url that uses the first IP address that MP2's server is bound to.
    // This may be different to the IP address used to request this site, to avoid CORS issues, trim the
    // url to a relative path, we should be hosted on the same machine so the request will still work.
    const relativeUrl = this.getRelativeUrl(hlsStreamUrl);

    // Request temp_playlist.m3u8 to bypass the transcoding service's 'predicted' playlist which causes issues.
    return relativeUrl + '&hls=temp_playlist.m3u8';
  }

  private getRelativeUrl(absoluteUrl: string): string {
    const url = new URL(absoluteUrl);
    return url.pathname + url.search;
  }
}
