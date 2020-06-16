import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppConfigService } from './app-config.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ApiRequestInterceptor } from './services/cache/api-request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
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
  providers: [
    {
      // App initializer that gets the app config file from the server.
      // The factory returns a promise so that Angular waits for it to
      // complete before continuing. This is important to ensure that the
      // config is available before any components that depend on it are created.
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => () => {
        return appConfigService.loadAppConfig();
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
