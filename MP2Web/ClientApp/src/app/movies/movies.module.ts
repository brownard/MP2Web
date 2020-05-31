import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from '../shared/shared.module';
import { VideoPlayerModule } from '../video-player/video-player.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieFilterComponent } from './components/movie-filter/movie-filter.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieEffects } from './store/movies.effects';
import * as MoviesStore from './store/movies.store';
  
@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LazyLoadImageModule,
    VideoPlayerModule,
    StoreModule.forFeature(MoviesStore.featureKey, MoviesStore.reducer),
    EffectsModule.forFeature([MovieEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MovieListComponent, data: { animation: 'MovieListPage' } },
      { path: ':id', component: MovieDetailsComponent, data: { animation: 'MovieDetailsPage' } }
    ])
  ]
})
export class MoviesModule { }
