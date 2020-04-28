import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './components/movies.component';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { StoreModule } from '@ngrx/store';
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
    StoreModule.forFeature(featureKey, reducer),
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
