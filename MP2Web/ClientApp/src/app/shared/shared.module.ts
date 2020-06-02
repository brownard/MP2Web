import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MediaListComponent } from './components/media-list/media-list.component';

@NgModule({
  declarations: [
    StarRatingComponent,
    MediaListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarRatingComponent,
    MediaListComponent,
    LazyLoadImageModule
  ]
})
export class SharedModule { }
