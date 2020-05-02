import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppCommonModule } from '../common/modules/app-common.module';
import { VideoPlayerModule } from '../video-player/video-player.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviesComponent } from './components/movies.component';
import { MoviesEffects } from './store/movies.effects';
import { reducer } from './store/movies.reducers';
import { featureKey } from './store/movies.state';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieListComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    VideoPlayerModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([MoviesEffects]),
    RouterModule.forChild([
      {
        path: '', component: MoviesComponent, data: { animation: 'MoviesPage' },
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: MovieListComponent, data: { animation: 'MovieListPage' } },
          { path: ':id', component: MovieDetailsComponent, data: { animation: 'MovieDetailsPage' } }
        ]
      }
      ])
  ]
})
export class MoviesModule { }
