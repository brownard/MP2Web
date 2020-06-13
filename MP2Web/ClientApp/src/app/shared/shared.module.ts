import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MaterialModule } from '../material/material.module';
import { BackgroundArtworkComponent } from './components/background-artwork/background-artwork.component';
import { MediaListFilterComponent } from './components/media-list-filter/media-list-filter.component';
import { MediaListComponent } from './components/media-list/media-list.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    StarRatingComponent,
    MediaListComponent,
    MediaListFilterComponent,
    BackgroundArtworkComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LazyLoadImageModule,
    StarRatingComponent,
    MediaListComponent,
    MediaListFilterComponent,
    BackgroundArtworkComponent
  ]
})
export class SharedModule { }
