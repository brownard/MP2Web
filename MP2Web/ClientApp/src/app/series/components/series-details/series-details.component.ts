import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebTVShowDetailed } from '../../../models/web-media-items';
import { ArtworkService } from '../../../services/artwork.service';
import { MediaAccessService } from '../../../services/media-access.service';
import * as SeriesStore from '../../store/series.store';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: [
    './series-details.component.css',
    '../../../shared/styles/media.styles.css'
  ]
})
export class SeriesDetailsComponent implements OnInit {

  public series$: Observable<WebTVShowDetailed>;

  constructor(private route: ActivatedRoute, public artworkService: ArtworkService, private mediaAccessService: MediaAccessService, private store: Store) {
    this.series$ = this.store.select(SeriesStore.SeriesSelectors.selectSelectedItem).pipe(
      switchMap(selectedSeries => {
        if (selectedSeries)
          return of(selectedSeries);
        else
          return this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.mediaAccessService.getTVShowDetailedById(params.get('id'))
            ))
      }));
  }

  ngOnInit(): void {
  }

  mapProperty(array: any[], property: string) {
    return array.map(a => a[property]);
  }
}
