import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebMusicAlbumBasic, WebMusicTrackDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: [
    './album-details.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class AlbumDetailsComponent implements OnInit {

  album$: Observable<WebMusicAlbumBasic>;
  tracks$: Observable<WebMusicTrackDetailed[]>;

  selectedTrack: WebMusicTrackDetailed;

  constructor(private route: ActivatedRoute, private albumService: AlbumService, public artworkService: ArtworkService) {
    this.album$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        albumService.getItem(params.get('id'))
      ));

    this.tracks$ = this.album$.pipe(
      switchMap(a => a ? this.albumService.getTracksForAlbum(a.Id) : of(null))
    );
  }

  ngOnInit(): void {
  }

  onTrackSelected(track: WebMusicTrackDetailed) {
    this.selectedTrack = track;
  }

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
