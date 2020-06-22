import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewState } from 'src/app/media/store/media.state';
import { WebTVShowDetailed } from 'src/app/models/web-media-items';
import { ArtworkService } from 'src/app/services/artwork.service';
import { SeriesService, seriesSortFields } from '../../services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [
    './series-list.component.css',
    '../../../../../shared/styles/media.styles.css'
  ]
})
export class SeriesListComponent {
  
  public series$: Observable<WebTVShowDetailed[]>;
  public seriesListState$: Observable<ViewState>;

  sortFields = seriesSortFields;

  constructor(public artworkService: ArtworkService, private seriesService: SeriesService) {

    this.seriesListState$ = this.seriesService.getSeriesListState();
    this.series$ = this.seriesService.getSeries();
  }

  public onFilterChanged(state: ViewState) {
    this.seriesService.setSeriesListState(state);
  }

  public showSeriesDetails(series: WebTVShowDetailed) {
    this.seriesService.setSelectedSeries(series);
  }
}
