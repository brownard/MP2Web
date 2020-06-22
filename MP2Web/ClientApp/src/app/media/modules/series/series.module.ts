import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerModule } from 'src/app/video-player/video-player.module';
import { SeasonDetailsComponent } from './components/season-details/season-details.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { GridSeriesComponent } from './components/series/grid-series/grid-series.component';
import * as SeriesStore from './store/series.store';
import { ListSeriesComponent } from './components/series/list-series/list-series.component';
  
@NgModule({
  declarations: [
    SeriesListComponent,
    SeriesDetailsComponent,
    SeasonDetailsComponent,
    GridSeriesComponent,
    ListSeriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoPlayerModule,
    StoreModule.forFeature(SeriesStore.featureKey, SeriesStore.reducer),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SeriesListComponent, data: { animation: 'SeriesListPage' } },
      { path: ':id', component: SeriesDetailsComponent, data: { animation: 'SeriesDetailsPage' } }
    ])
  ]
})
export class SeriesModule { }
