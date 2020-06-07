import { Store } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import { MediaActions } from '../store/media.actions';
import { MediaSelectors } from '../store/media.selectors';
import { ListState } from '../store/media.state';

export abstract class AbstractMediaService<T> {

  constructor(protected store: Store, protected selectors: MediaSelectors<T>, protected actions: MediaActions<T>) { }
  
  protected getListState(): Observable<ListState> {
    return this.store.select(this.selectors.selectCurrentFilter);
  }

  protected setListState(state: ListState) {
    this.store.dispatch(this.actions.setItemsFilter(state.currentFilter, state.currentSort, state.currentOrder));
  }

  protected getItemsWithState<T>(getItemsFunc: (filter: string, sort: WebSortField, order: WebSortOrder) => Observable<T[]>): Observable<T[]> {
    return this.getListState().pipe(
      //switchMap(s => getItemsFunc(s.currentFilter, s.currentSort, s.currentOrder))
      switchMap(s => concat(
        // Send a null value first to invalidate the items,
        // so the component can show a loading indicator
        of<T[]>(null),
        getItemsFunc(s.currentFilter, s.currentSort, s.currentOrder)
      ))
    );
  }

  protected getSelectedItem(): Observable<T> {
    return this.store.select(this.selectors.selectSelectedItem);
  }

  protected setSelectedItem(item: T) {
    this.store.dispatch(this.actions.setSelectedItem(item));
  }
}
