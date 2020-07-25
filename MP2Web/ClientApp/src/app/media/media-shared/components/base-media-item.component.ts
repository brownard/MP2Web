import { Input } from '@angular/core';
import { ArtworkService } from 'src/app/core/api/artwork.service';

/** Base class for a component that displays a media item. */
export class BaseMediaItemComponent<T> {

  constructor(public artworkService: ArtworkService) { }

  protected _item: T;

  public get item() {
    return this._item;
  }

  @Input()
  public set item(value: T) {
    this._item = value;
  }
}
