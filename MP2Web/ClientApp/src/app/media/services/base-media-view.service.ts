import { Store } from '@ngrx/store';

import { concat, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WebSortField, WebSortOrder } from 'src/app/models/web-media-items';
import { MediaViewStore } from '../store/media-view.store';
import { ViewState } from '../store/media-view.state';

export abstract class BaseMediaViewService<T extends { Id: string }> {

  protected abstract loadItems(viewState: ViewState): Observable<T[]>;
  protected abstract loadItem(id: string): Observable<T>;

  constructor(protected store: Store, protected viewStore: MediaViewStore<T>) { }
  
  public getViewState(): Observable<ViewState> {
    return this.store.select(this.viewStore.selectViewState);
  }

  public setViewState(state: ViewState) {
    this.store.dispatch(this.viewStore.setViewState(state));
  }
   
  public getSelectedItem(): Observable<T> {
    return this.store.select(this.viewStore.selectSelectedItem);
  }

  public setSelectedItem(item: T) {
    this.store.dispatch(this.viewStore.setSelectedItem(item));
  }

  public getItem(id: string) {
    return this.getSelectedItem().pipe(
      switchMap(m => !!m && m.Id === id ? of(m) : this.loadItem(id))
    );
  }

  public getItems(): Observable<T[]> {
    return this.getViewState().pipe(
      switchMap(viewState => concat(
        // Send a null value first to invalidate the items,
        // so the component can show a loading indicator
        of<T[]>(null),
        this.loadItems(viewState)
      ))
    );
  }

  protected getItemsWithState<T>(getItemsFunc: (filter: string, sort: WebSortField, order: WebSortOrder) => Observable<T[]>): Observable<T[]> {
    return this.getViewState().pipe(
      //switchMap(s => getItemsFunc(s.currentFilter, s.currentSort, s.currentOrder))
      switchMap(s => concat(
        // Send a null value first to invalidate the items,
        // so the component can show a loading indicator
        of<T[]>(null),
        getItemsFunc(s.filter, s.sort, s.order)
      ))
    );
  }
}
