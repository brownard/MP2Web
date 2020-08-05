import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AppRouteReuseStrategy } from './app-route-reuse.strategy';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
  {
    path: 'movies', data: { animation: 'MoviesPage' },
    loadChildren: () => import('../media/movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: 'series', data: { animation: 'SeriesPage' },
    loadChildren: () => import('../media/series/series.module').then(m => m.SeriesModule)
  },
  {
    path: 'music', data: { animation: 'MusicPage' },
    loadChildren: () => import('../media/music/music.module').then(m => m.MusicModule)
  },
  {
    path: 'tv',
    loadChildren: () => import('../tv/tv.module').then(m => m.TvModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
