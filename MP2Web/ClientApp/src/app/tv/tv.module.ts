import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { EpgComponent } from './components/epg/epg.component';
import { TvComponent } from './components/tv/tv.component';
import { GuideWidthPipe } from './pipes/guide-width.pipe';
import { IsAiringPipe } from './pipes/is-airing.pipe';


@NgModule({
  declarations: [EpgComponent, IsAiringPipe, GuideWidthPipe, TvComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: TvComponent,
        children: [
          { path: '', redirectTo: 'guide', pathMatch: 'full' },
          { path: 'guide', component: EpgComponent }
        ]
      }
    ])
  ]
})
export class TvModule { }
