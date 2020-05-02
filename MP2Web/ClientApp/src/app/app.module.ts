import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppConfigService } from './app-config.service';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SeriesComponent } from './series/series.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SeriesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {
        path: 'movies', data: { animation: 'MoviesPage' },
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)
      },
      { path: 'series', component: SeriesComponent, data: { animation: 'SeriesPage' } },
    ]),
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
