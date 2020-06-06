import { Directive, ElementRef, Input } from '@angular/core';
import { WebFIleType, WebMediaType } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Directive({
  selector: '[appArtwork]',
  exportAs: 'appArtwork'
})
export class ArtworkDirective {

  constructor(private el: ElementRef, private artworkService: ArtworkService) { }

  private _itemId: string;

  @Input() fileType: WebFIleType;
  @Input() mediaType: WebMediaType;
  @Input() imageWidth: number;
  @Input() imageHeight: number;

  get itemId() {
    return this._itemId;
  }

  @Input()
  set itemId(value: string) {
    this._itemId = value;
    this.setBackgroundImage();
  }

  private setBackgroundImage(): void {
    if (this._itemId) {
      let url = this.getImageUrl();
      this.el.nativeElement.style.backgroundImage = 'url(' + url + ')';
    }
    else
      this.el.nativeElement.style.backgroundImage = '';
  }

  private getImageUrl(): string {
    return this.artworkService.getArtworkUrl(this.mediaType, this._itemId, this.fileType, 0, this.imageWidth, this.imageHeight);
  }
}
