import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebTVEpisodeDetailed, WebTVSeasonDetailed } from 'src/app/core/models/web-media-items';
import { ArtworkService } from 'src/app/core/api/artwork.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-season-details',
  templateUrl: './season-details.component.html',
  styleUrls: [
    './season-details.component.css',
    '../../../media-shared/styles/media.styles.css'
  ]
})
export class SeasonDetailsComponent implements OnInit, OnDestroy {

  isExpanded = false;
  episodes: WebTVEpisodeDetailed[];
  episodesSubscription: Subscription;

  @Input()
  season: WebTVSeasonDetailed;

  @Output()
  episodeSelected: EventEmitter<WebTVEpisodeDetailed> = new EventEmitter();

  constructor(private seriesService: SeriesService, public artworkService: ArtworkService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.episodesSubscription)
      this.episodesSubscription.unsubscribe();
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    // If this is the first time we've been expanded then request the episodes.
    // We subscribe here rather than using an async pipe in the template to ensure
    // we only request the episodes once, otherwise the template would resubscribe
    // every time it's expanded, which would cause another web request because the
    // returned observable is cold.
    if (this.isExpanded && this.season && !this.episodesSubscription)
      this.episodesSubscription = this.seriesService.getEpisodesForSeason(this.season.Id)
        .subscribe(result => this.episodes = result);
  }

  selectEpisode(episode: WebTVEpisodeDetailed) {
    this.episodeSelected.emit(episode);
  }
}
