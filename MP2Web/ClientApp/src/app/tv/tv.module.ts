import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { EpgRowComponent } from './components/epg/epg-row/epg-row.component';
import { EpgComponent } from './components/epg/epg.component';
import { ProgramDetailsComponent } from './components/programs/program-details/program-details.component';
import { ProgramListItemComponent } from './components/programs/program-list-item/program-list-item.component';
import { ScheduleEditComponent } from './components/schedules/schedule-edit/schedule-edit.component';
import { ScheduleListItemComponent } from './components/schedules/schedule-list-item/schedule-list-item.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { TvComponent } from './components/tv/tv.component';
import { GuideWidthPipe } from './pipes/guide-width.pipe';
import { IsAiringPipe } from './pipes/is-airing.pipe';
import { OptionalDatePipe } from './pipes/optional-date.pipe';
import { effects } from './store/tv.effects';
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
    EpgRowComponent,
    ScheduleEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: TvComponent,
        children: [
          { path: '', redirectTo: 'guide', pathMatch: 'full' },
          { path: 'guide/program/:id', component: ProgramDetailsComponent },
          { path: 'guide', component: EpgComponent, data: { routerReuseId: 'EpgPage', routerReuseChild: ProgramDetailsComponent } },
          { path: 'schedules/:id/edit', component: ScheduleEditComponent },
          { path: 'schedules', component: SchedulesComponent },
        ]
      }
    ]),
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature(effects)
  ]
})
export class TvModule { }
