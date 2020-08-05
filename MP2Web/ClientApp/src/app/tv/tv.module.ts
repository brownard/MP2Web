import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { TvGuideComponent } from './components/tv-guide/tv-guide.component';


@NgModule({
  declarations: [TvGuideComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'guide', pathMatch: 'full' },
      { path: 'guide', component: TvGuideComponent }
    ])
  ]
})
export class TvModule { }
