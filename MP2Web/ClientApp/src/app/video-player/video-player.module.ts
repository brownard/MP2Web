import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { VideoControlsComponent } from './components/video-controls/video-controls.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VideoPlayerDirective } from './directives/video-player.directive';
import { PlaybackTimePipe } from './pipes/playback-time.pipe';


@NgModule({
  declarations: [
    VideoPlayerComponent,
    VideoPlayerDirective,
    VideoControlsComponent,
    PlaybackTimePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    VideoPlayerComponent,
    VideoPlayerDirective
  ]
})
export class VideoPlayerModule { }
