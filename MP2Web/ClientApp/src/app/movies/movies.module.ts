import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VideoPlayerModule } from '../video-player/video-player.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviesEffects } from './store/movies.effects';
import * as MoviesReducers from './store/movies.reducers';
import * as MoviesState from './store/movies.state';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoPlayerModule,
    StoreModule.forFeature(MoviesState.featureKey, MoviesReducers.reducer),
    EffectsModule.forFeature([MoviesEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MovieListComponent, data: { animation: 'MovieListPage' } },
      { path: ':id', component: MovieDetailsComponent, data: { animation: 'MovieDetailsPage' } }
    ])
  ]
})
export class MoviesModule { }
