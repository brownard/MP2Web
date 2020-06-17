import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnInit {

  constructor() { }

  private _starCount: number = 5;
  private _maxRating: number = 10;
  private _rating: number;

  widthPercent: number = 0;

  // It only seems possible to use the *ngFor directive
  // to iterate over an enumeration of items, we can't
  // just do a simple for loop n times, so we use an
  // array of the required length with dummy data to
  // iterate over when creating the required number of stars
  stars: number[] = [1, 1, 1, 1, 1];

  ngOnInit(): void {
    this.setWidthPercent();
  }

  get rating() {
    return this._rating;
  }

  @Input()
  set rating(value: number) {
    this._rating = value;
    this.setWidthPercent();
  }

  get maxRating() {
    return this._maxRating;
  }

  @Input()
  set maxRating(value: number) {
    this._maxRating = value;
    this.setWidthPercent();
  }

  get starCount(): number {
    return this._starCount;
  }

  @Input()
  set starCount(value: number) {
    this._starCount = value;
    this.stars = [];
    for (let i = 0; i < this._starCount; i++)
      this.stars[i] = i;
  }

  private setWidthPercent() {
    if (!this._rating || !this._maxRating)
      this.widthPercent = 0;
    else
      this.widthPercent = 100 * this.rating / this._maxRating;
  }
}
