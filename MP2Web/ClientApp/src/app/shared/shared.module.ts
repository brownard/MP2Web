import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MediaListComponent } from './components/media-list/media-list.component';
import { MediaListBarComponent } from './components/media-list-bar/media-list-bar.component';

@NgModule({
  declarations: [
    StarRatingComponent,
    MediaListComponent,
    MediaListBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarRatingComponent,
    MediaListComponent,
    MediaListBarComponent,
    LazyLoadImageModule
  ]
})
export class SharedModule { }
