import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebTVEpisodeDetailed, WebTVSeasonDetailed, WebTVShowDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: [
    './series-details.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class SeriesDetailsComponent implements OnInit {

  series$: Observable<WebTVShowDetailed>;
  seasons$: Observable<WebTVSeasonDetailed[]>;

  selectedEpisode: WebTVEpisodeDetailed;

  constructor(private route: ActivatedRoute, private seriesService: SeriesService, public artworkService: ArtworkService) {
    this.series$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        seriesService.getSelectedSeries(params.get('id'))
      ));

    this.seasons$ = this.series$.pipe(
      switchMap(series => series ? this.seriesService.getSeasonsForSeries(series.Id) : of(null))
    );
  }

  ngOnInit(): void {
  }

  onEpisodeSelected(episode: WebTVEpisodeDetailed) {
    this.selectedEpisode = episode;
  }

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
