import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { VideoPlayerModule } from 'src/app/video-player/video-player.module';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { GridAlbumComponent } from './components/album/grid-album/grid-album.component';
import { ListAlbumComponent } from './components/album/list-album/list-album.component';
import { ListTrackComponent } from './components/track/list-track/list-track.component';
import { featureKey, reducers } from './store/music.store';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailsComponent, ListTrackComponent, GridAlbumComponent, ListAlbumComponent],
  imports: [
    CommonModule,
    SharedModule,
    VideoPlayerModule,
    StoreModule.forFeature(featureKey, reducers),
    RouterModule.forChild([
      { path: '', redirectTo: 'album/list', pathMatch: 'full' },
      { path: 'album', redirectTo: 'album/list', pathMatch: 'full' },
      { path: 'album/list', component: AlbumListComponent, data: { animation: 'AlbumListPage' } },
      { path: 'album/:id', component: AlbumDetailsComponent, data: { animation: 'AlbumDetailsPage' } }
    ])
  ]
})
export class MusicModule { }
