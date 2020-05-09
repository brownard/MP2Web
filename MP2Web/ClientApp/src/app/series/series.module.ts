import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { VideoPlayerModule } from '../video-player/video-player.module';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesFilterComponent } from './components/series-filter/series-filter.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { SeriesEffects } from './store/series.effects';
import * as SeriesReducers from './store/series.reducers';
import * as SeriesState from './store/series.state';
  
@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailsComponent,
    SeriesFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoPlayerModule,
    StoreModule.forFeature(SeriesState.featureKey, SeriesReducers.reducer),
    EffectsModule.forFeature([SeriesEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SeriesListComponent, data: { animation: 'SeriesListPage' } },
      { path: ':id', component: SeriesDetailsComponent, data: { animation: 'SeriesDetailsPage' } }
    ])
  ]
})
export class SeriesModule { }
