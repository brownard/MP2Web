import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { VideoPlayerModule } from '../video-player/video-player.module';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { MusicAlbumEffects } from './store/music.effects';
import * as MusicAlbumStore from './store/music.store';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { ListTrackComponent } from './components/track/list-track/list-track.component';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailsComponent, ListTrackComponent],
  imports: [
    CommonModule,
    SharedModule,
    VideoPlayerModule,
    StoreModule.forFeature(MusicAlbumStore.featureKey, MusicAlbumStore.reducer),
    EffectsModule.forFeature([MusicAlbumEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'album/list', pathMatch: 'full' },
      { path: 'album', redirectTo: 'album/list', pathMatch: 'full' },
      { path: 'album/list', component: AlbumListComponent, data: { animation: 'AlbumListPage' } },
      { path: 'album/:id', component: AlbumDetailsComponent, data: { animation: 'AlbumDetailsPage' } }
    ])
  ]
})
export class MusicModule { }
