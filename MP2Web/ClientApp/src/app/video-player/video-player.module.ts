import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './components/video-player.component';
import { VideoPlayerDirective } from './directives/video-player.directive';

@NgModule({
  declarations: [
    VideoPlayerComponent,
    VideoPlayerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VideoPlayerComponent,
    VideoPlayerDirective
  ]
})
export class VideoPlayerModule { }
