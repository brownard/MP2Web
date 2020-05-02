import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class StarRatingComponent implements OnInit {

  constructor() { }

  private _rating: number;

  stars = [1,2,3]

  ngOnInit(): void {
  }

  get rating() {
    return this._rating;
  }

  @Input()
  set rating(rating: number) {
    this._rating = rating;
    this.stars = [];
    for (let i = 0; i < this._rating; i++)
      this.stars[i] = i;
  }
}
