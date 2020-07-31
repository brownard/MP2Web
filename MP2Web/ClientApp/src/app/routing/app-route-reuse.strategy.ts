import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { Logger } from '../core/logging/logger.service';


const REUSE_ID_KEY = 'routerReuseId';
const REUSE_CHILD_KEY = 'routerReuseChild';

/** Custom RouteReuseStrategy that reuses routes if their route data contains a routerReuseId. An optional routerReuseChild may also be specified,
    in which case the route will only be reused when navigating to a route with a component with the same name as routeReuseChild */
@Injectable()
export class AppRouteReuseStrategy extends RouteReuseStrategy {

  constructor(private logger: Logger) {
    super();
  }

  // Map of routes that should be detached and stored, this
  // is dynamically updated in shouldReuseRoute
  detachableRoutes: { [key: string]: boolean } = {};

  // Store of detached route handles used to re-attach detached routes
  routeStorage: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const reuseId: string = route.data[REUSE_ID_KEY];
    const detach = !!reuseId && !!this.detachableRoutes[reuseId];
    if (detach) {
      this.logger.debug('RouteReuseStrategy: Detaching route ' + reuseId);
      this.detachableRoutes[reuseId] = false;
    }
    return detach;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const reuseId: string = route.data[REUSE_ID_KEY];
    if (!!reuseId) {
      this.logger.debug('RouteReuseStrategy: Storing route ' + reuseId + ': ' + handle);
      this.routeStorage[reuseId] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const reuseId: string = route.data[REUSE_ID_KEY];
    const attach = !!reuseId && !!this.routeStorage[reuseId];
    if(attach)
    this.logger.debug('RouteReuseStrategy: Attaching route ' + reuseId);
    return attach;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const reuseId: string = route.data[REUSE_ID_KEY];
    if (!!reuseId) {
      this.logger.debug('RouteReuseStrategy: Retrieving route ' + reuseId);
      return this.routeStorage[reuseId];
    }
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const reuseId: string = future.data[REUSE_ID_KEY];
    // Mark the route for detaching if the future route has a reuseId and either
    // there's no child route or the current route is the matching child 
    if (!!reuseId) {
      const shouldReuse = !future.data[REUSE_CHILD_KEY] || future.data[REUSE_CHILD_KEY] === curr.component;
      this.logger.debug('RouteReuseStrategy: shouldReuseRoute ' + reuseId + ': ' + shouldReuse);
      this.detachableRoutes[reuseId] = shouldReuse;
    }

    // This is the default handling for shouldReuseRoute
    return curr.routeConfig === future.routeConfig;
  }
}
