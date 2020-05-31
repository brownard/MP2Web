import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WebMusicAlbumBasic } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import * as MusicAlbumStore from '../../store/music.store';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: [
    './album-list.component.css',
    '../../../shared/styles/media.styles.css'
  ]
})
export class AlbumListComponent implements OnInit, OnDestroy {

  private albumStateSubscription$: Subscription;
  public albums$: Observable<WebMusicAlbumBasic[]>;

  constructor(public artworkService: ArtworkService, private store: Store) {
    this.albumStateSubscription$ = this.store.select(MusicAlbumStore.MusicAlbumSelectors.selectState)
      .subscribe(state =>
        this.store.dispatch(MusicAlbumStore.MusicAlbumActions.getItems()));

    this.albums$ = this.store.select(MusicAlbumStore.MusicAlbumSelectors.selectCurrentItems);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.albumStateSubscription$.unsubscribe();
  }

  public showAlbumDetails(album: WebMusicAlbumBasic) {
    this.store.dispatch(MusicAlbumStore.MusicAlbumActions.setSelectedItem(album));
    //this.router.navigate(['/movies', movie.Id]);
  }
}
