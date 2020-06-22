import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerModule } from 'src/app/video-player/video-player.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { GridMovieComponent } from './components/movie/grid-movie/grid-movie.component';
import * as MoviesStore from './store/movies.store';
import { ListMovieComponent } from './components/movie/list-movie/list-movie.component';
  
@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    GridMovieComponent,
    ListMovieComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoPlayerModule,
    StoreModule.forFeature(MoviesStore.featureKey, MoviesStore.reducer),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MovieListComponent, data: { animation: 'MovieListPage' } },
      { path: ':id', component: MovieDetailsComponent, data: { animation: 'MovieDetailsPage' } }
    ])
  ]
})
export class MoviesModule { }
