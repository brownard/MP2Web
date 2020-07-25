import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      {
        path: 'movies', data: { animation: 'MoviesPage' },
        loadChildren: () => import('./media/modules/movies/movies.module').then(m => m.MoviesModule)
      },
      {
        path: 'series', data: { animation: 'SeriesPage' },
        loadChildren: () => import('./media/modules/series/series.module').then(m => m.SeriesModule)
      },
      {
        path: 'music', data: { animation: 'MusicPage' },
        loadChildren: () => import('./media/modules/music/music.module').then(m => m.MusicModule)
      },
    ], { scrollPositionRestoration: 'enabled' }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
