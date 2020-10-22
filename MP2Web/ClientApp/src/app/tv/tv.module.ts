import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { EpgRowComponent } from './components/epg/epg-row/epg-row.component';
import { EpgComponent } from './components/epg/epg.component';
import { ProgramDetailsComponent } from './components/programs/program-details/program-details.component';
import { ProgramListItemComponent } from './components/programs/program-list-item/program-list-item.component';
import { ScheduleListItemComponent } from './components/schedules/schedule-list-item/schedule-list-item.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { TvComponent } from './components/tv/tv.component';
import { GuideWidthPipe } from './pipes/guide-width.pipe';
import { IsAiringPipe } from './pipes/is-airing.pipe';
import { OptionalDatePipe } from './pipes/optional-date.pipe';
import { EpgEffects } from './store/epg/epg.effects';
import { ScheduleEffects } from './store/schedules/schedule.effects';
import { featureKey, reducer } from './store/tv.store';

@NgModule({
  declarations: [
    EpgComponent,
    GuideWidthPipe,
    IsAiringPipe,
    OptionalDatePipe,
    SchedulesComponent,
    TvComponent,
    ProgramDetailsComponent,
    ProgramListItemComponent,
    ScheduleListItemComponent,
    EpgRowComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: TvComponent,
        children: [
          { path: '', redirectTo: 'guide', pathMatch: 'full' },
          { path: 'guide', component: EpgComponent, data: { routerReuseId: 'EpgPage', routerReuseChild: ProgramDetailsComponent } },
          { path: 'schedules', component: SchedulesComponent }
        ]
      },
      {
        path: 'program/:id', component: ProgramDetailsComponent
      }
    ]),
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([ScheduleEffects, EpgEffects])
  ]
})
export class TvModule { }
