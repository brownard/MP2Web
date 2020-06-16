import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './components/video-player.component';
import { VideoPlayerDirective } from './directives/video-player.directive';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    VideoPlayerComponent,
    VideoPlayerDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    VideoPlayerComponent,
    VideoPlayerDirective
  ]
})
export class VideoPlayerModule { }
