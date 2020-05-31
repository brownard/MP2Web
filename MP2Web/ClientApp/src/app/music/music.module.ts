import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from '../shared/shared.module';
import { VideoPlayerModule } from '../video-player/video-player.module';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { MusicAlbumEffects } from './store/music.effects';
import * as MusicAlbumStore from './store/music.store';

@NgModule({
  declarations: [AlbumListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LazyLoadImageModule,
    VideoPlayerModule,
    StoreModule.forFeature(MusicAlbumStore.featureKey, MusicAlbumStore.reducer),
    EffectsModule.forFeature([MusicAlbumEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: AlbumListComponent, data: { animation: 'AlbumListPage' } },
      //{ path: ':id', component: AlbumDetailsComponent, data: { animation: 'AlbumDetailsPage' } }
    ])
  ]
})
export class MusicModule { }
