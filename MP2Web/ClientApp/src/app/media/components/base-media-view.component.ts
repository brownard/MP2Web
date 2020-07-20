import { AbstractMediaViewService } from '../services/abstract-media-view.service';
import { Observable } from 'rxjs';
import { ViewState } from '../store/media.state';

/** Base class for a component that displays a collection of media item. */
export class BaseMediaViewComponent<T extends { Id: string }> {

  public items$: Observable<T[]>;
  public viewState$: Observable<ViewState>;

  constructor(protected viewService: AbstractMediaViewService<T>) {
    this.items$ = viewService.getItems();
    this.viewState$ = viewService.getViewState();
  }

  public onViewStateChanged(state: ViewState) {
    this.viewService.setViewState(state);
  }

  public onSelectedItemChanged(item: T) {
    this.viewService.setSelectedItem(item);
  }
}
