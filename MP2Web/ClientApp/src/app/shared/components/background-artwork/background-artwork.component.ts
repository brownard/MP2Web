import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebFIleType, WebMediaType } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-background-artwork',
  templateUrl: './background-artwork.component.html',
  styleUrls: ['./background-artwork.component.css']
})
export class BackgroundArtworkComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private artworkService: ArtworkService) { }

  private _itemId: string;

  private imageLoader: HTMLImageElement;
  private currentImage: HTMLElement;
  private nextImage: HTMLElement;
  private nextUrl: string = '';

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
  
  @ViewChild('image1') image1: ElementRef<HTMLElement>;
  @ViewChild('image2') image2: ElementRef<HTMLElement>;

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.currentImage = this.image1.nativeElement;
    this.nextImage = this.image2.nativeElement;
    this.nextImage.style.opacity = '0';
    this.setBackgroundImage();
  }

  ngOnDestroy(): void {
    if (this.imageLoader)
      this.imageLoader.remove();
  }

  toggleImages() {
    let temp = this.currentImage;
    this.currentImage = this.nextImage;
    this.nextImage = temp;

    this.currentImage.style.backgroundImage = 'url(' + this.nextUrl + ')';
    this.currentImage.style.opacity = '';
    this.nextImage.style.opacity = '0';
  }

  private setBackgroundImage(): void {
    let newUrl = this.getImageUrl();
    if (newUrl === this.nextUrl)
      return;

    this.nextUrl = newUrl;
    if (this.nextUrl)
      this.loadImageAsync();
    else
      this.toggleImages();
  }

  private loadImageAsync() {
    this.imageLoader = new Image();
    let closureImage = this.imageLoader;
    this.imageLoader.onload = () => this.onImageLoaded(closureImage);
    this.imageLoader.onerror = () => this.onImageLoaded(closureImage);
    this.imageLoader.src = this.nextUrl;
  }

  private onImageLoaded(img: HTMLImageElement) {
    img.remove();
    if (img === this.imageLoader)
      this.toggleImages();
  }

  private getImageUrl(): string {
    if (!this.itemId)
      return '';
    return this.artworkService.getArtworkUrl(this.mediaType, this._itemId, this.fileType, 0, this.imageWidth, this.imageHeight);
  }
}
