import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebFileType, WebMediaType } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';

// Component that shows a fullscreen fanart image in the
// background and supports transitioning between images.
@Component({
  selector: 'app-background-artwork',
  templateUrl: './background-artwork.component.html',
  styleUrls: ['./background-artwork.component.css']
})
export class BackgroundArtworkComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private artworkService: ArtworkService) { }
   
  // The id of the item to load
  private _itemId: string;

  // Used to fully download an image in the background before displaying it 
  private imageLoader: HTMLImageElement;

  private currentImage: HTMLElement;
  private nextImage: HTMLElement;
  private currentUrl: string = '';

  // We need to toggle between 2 elements to allow transitions
  @ViewChild('image1') image1: ElementRef<HTMLElement>;
  @ViewChild('image2') image2: ElementRef<HTMLElement>;

  // Needed to build the image url, must be set before itemId
  @Input() fileType: WebFileType;
  @Input() mediaType: WebMediaType;
  @Input() imageWidth: number;
  @Input() imageHeight: number;

  // Number of ms to wait for before attempting to load a new image,
  // used to debounce multiple quick updates when scrolling
  @Input() debounce: number = 500;

  // Handle to a timeout started when the item id has changed
  private debounceTimeout: number;
    
  // Gets or sets the id of the item to load an image for, setting/updating
  // this property will trigger an update of the background image. 
  get itemId() {
    return this._itemId;
  }

  @Input()
  set itemId(value: string) {
    this._itemId = value;
    this.setBackgroundImage();
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    // SHould be safe to get references to the actual elements now
    this.currentImage = this.image1.nativeElement;
    this.nextImage = this.image2.nativeElement;
    // Initially hide the second element
    this.nextImage.style.opacity = '0';
    this.setBackgroundImage();
  }

  ngOnDestroy(): void {
    clearTimeout(this.debounceTimeout);
    // Double check that we've removed any leftover image elements
    if (this.imageLoader)
      this.imageLoader.remove();
  }

  // Updates the background image if the current properties have changed.
  private setBackgroundImage(): void {
    // To avoid multiple quick updates, e.g. when scrolling, only update the image
    // after no more updates have been requested for a specified time, so clear any
    // existing timer and start a new one on every new request.
    if (this.debounceTimeout)
      window.clearTimeout(this.debounceTimeout);

    this.debounceTimeout = window.setTimeout(() => {
      let newUrl = this.getImageUrl();
      if (newUrl === this.currentUrl)
        return;

      // If we've got a url, attempt to asynchronously load the image, else
      // the properties were probably invalid so cycle to an empty image.
      if (newUrl)
        this.loadImageAsync(newUrl);
      else
        this.cycleImages(newUrl);
    }, this.debounce);
  }

  // Loads an image from a url asynchronously and cycles to the new image when completed
  private loadImageAsync(imageUrl: string) {

    // We'll load the image first using a hidden image tag and use it's onload event to
    // determine when it's done, this ensures the image is cached so it displays instantly
    // when we update the background-image property of the element.
    let image = new Image();
    this.imageLoader = image;

    // Treat onerror the same as onload to ensure the images are always removed/cycled correctly,
    // the image will be blank in case of an error but this is probably the correct behaviour.
    image.onload = () => this.onImageLoaded(image, imageUrl);
    image.onerror = () => this.onImageLoaded(image, '');
    image.src = imageUrl;
  }

  // Callback for when an image has finished loading, cycles to the newly loaded image.
  private onImageLoaded(img: HTMLImageElement, imageUrl: string) {
    img.remove();
    // A new image may have been requested whilst this one was loading, in which case our image
    // object will be different to the class level one, just drop our one in that case.
    if (img === this.imageLoader)
      this.cycleImages(imageUrl);
  }

  // Shows the next element using the next image and hides the current element
  private cycleImages(newImageUrl: string) {
    // Switch the current and next elements
    let temp = this.currentImage;
    this.currentImage = this.nextImage;
    this.nextImage = temp;

    // Set the new background image url and revert any opacity we applied to hide it previously
    this.currentImage.style.backgroundImage = 'url(' + newImageUrl + ')';
    this.currentImage.style.opacity = '';
    // hide the old image
    this.nextImage.style.opacity = '0';

    this.currentUrl = newImageUrl;
  }

  // Gets the url to the image specified by the input properties, or empty if no itemId has been set.
  private getImageUrl(): string {
    return this.itemId ? this.artworkService.getArtworkUrl(this.mediaType, this._itemId, this.fileType, this.imageWidth, this.imageHeight, 0) : '';
  }
}
