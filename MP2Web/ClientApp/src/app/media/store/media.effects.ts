import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MediaActions } from './media.actions';
import { MediaSelectors } from './media.selectors';
import { MediaState } from './media.state';

export abstract class MediaEffects<T> {

  constructor(private actions$: Actions, private store: Store, private mediaActions: MediaActions<T>, private mediaSelectors: MediaSelectors<T>) { }

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.mediaActions.getItems),
      withLatestFrom(this.store.select(this.mediaSelectors.selectState)),
      // Only trigger the action if items aren't already loaded otherwise we might get called
      // recursively as updating the items will cause all bound selectors to run which might
      // then trigger another update
      filter(([action, state]) => !state.currentItems),
      switchMap(([, state]) => this.setItems(state))
    )
  );

  setItems(state: MediaState<T>) {
    return this.getItems(state).pipe(
      map(movies => this.mediaActions.setItems(movies)),
      catchError(() => of(this.mediaActions.setItems([])))
    )
  }

  protected abstract getItems(state: MediaState<T>): Observable<T[]>;
}
