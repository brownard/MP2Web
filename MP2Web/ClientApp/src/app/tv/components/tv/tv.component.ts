import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, shareReplay } from 'rxjs/operators';

type ToolbarData = { title: string, menu?: any[] };

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  tabRoutes: { name: string, link: string }[] = [
    { name: 'Guide', link: 'guide' },
    { name: 'Schedules', link: 'schedules' },
    { name: 'Recordings', link: 'recordings' }
  ];

  currentToolbarData$: Observable<ToolbarData>;
  showTabControl$: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute) {

    // Observable that emits the current first child route of this component's activated route,
    // i.e. the activated route of the first router outlet in this component. This is used to
    // determine whether to show the tab controls or any custom toolbar data in the toolbar.
    const firstChildRoute$ = merge(

      // The NavigationEnd event doesn't seem to fire on initial
      // page load so also merge in the initial value of firstChild.
      of(route.firstChild),

      // Listen for the NavigationEnd event and pipe the updated firstChild.
      router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        // firstChild has changed.
        map(() => route.firstChild)
      )
    ).pipe(shareReplay(1));

    this.currentToolbarData$ = firstChildRoute$.pipe(
      map(firstChild => {
        let toolbarData: ToolbarData = undefined;
        while (firstChild) {
          const currentData = firstChild.snapshot.data as ToolbarData;
          if (currentData)
            toolbarData = currentData;
          firstChild = firstChild.firstChild;
        }
        return toolbarData;
      })
    );

    // Only show the tab controls when viewing a tab, which will be the case
    // if the last url segment is one of links defined in the tab routes.
    this.showTabControl$ = firstChildRoute$.pipe(
      switchMap(firstChild => firstChild ? firstChild.url : of<UrlSegment[]>([])),
      map(segments => {
        if (!segments || segments.length < 1)
          return false;
        const lastSegment = segments[segments.length - 1].path.toLowerCase();
        return this.tabRoutes.some(r => r.link === lastSegment);
      })
    );
  }

  ngOnInit(): void {
  }

}
