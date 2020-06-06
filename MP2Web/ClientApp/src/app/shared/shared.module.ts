import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MediaListComponent } from './components/media-list/media-list.component';
import { MediaListFilterComponent } from './components/media-list-filter/media-list-filter.component';

@NgModule({
  declarations: [
    StarRatingComponent,
    MediaListComponent,
    MediaListFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarRatingComponent,
    MediaListComponent,
    MediaListFilterComponent,
    LazyLoadImageModule
  ]
})
export class SharedModule { }
