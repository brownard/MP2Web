import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { EpgProgramDialogComponent } from './components/epg-program-dialog/epg-program-dialog.component';
import { EpgComponent } from './components/epg/epg.component';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { TvComponent } from './components/tv/tv.component';
import { GuideWidthPipe } from './pipes/guide-width.pipe';
import { IsAiringPipe } from './pipes/is-airing.pipe';
import { OptionalDatePipe } from './pipes/optional-date.pipe';


@NgModule({
  declarations: [
    EpgComponent,
    EpgProgramDialogComponent,
    GuideWidthPipe,
    IsAiringPipe,
    OptionalDatePipe,
    SchedulesComponent,
    TvComponent,
    ProgramDetailsComponent
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
    ])
  ],
  entryComponents: [
    EpgProgramDialogComponent
  ]
})
export class TvModule { }
