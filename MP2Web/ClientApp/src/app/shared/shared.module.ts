import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MaterialModule } from '../material/material.module';
import { BackgroundArtworkComponent } from './components/background-artwork/background-artwork.component';
import { MediaListFilterComponent } from './components/media-list-filter/media-list-filter.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { BackNavigationDirective } from './directives/back-navigation.directive';

@NgModule({
  declarations: [
    StarRatingComponent,
    ListViewComponent,
    MediaListFilterComponent,
    BackgroundArtworkComponent,
    BackNavigationDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LazyLoadImageModule,
    StarRatingComponent,
    ListViewComponent,
    MediaListFilterComponent,
    BackgroundArtworkComponent,
    BackNavigationDirective
  ]
})
export class SharedModule { }
