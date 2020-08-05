import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiRequestCache } from '../cache/api-request.cache';
import { Logger } from '../logging/logger.service';

const cacheUrls = [
  '/MPExtended/MediaAccessService/json/'
];

// Interceptor that caches any requests that match the path specified in cacheUrls
@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {
  constructor(private cache: ApiRequestCache, private logger: Logger) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Not a cacheable path, simply pass the request on
    if (!this.shouldCache(req)) {
      this.logger.debug('ApiRequestInterceptor: Not caching request for ' + req.urlWithParams);
      return next.handle(req);
    }

    // Either return a cached response if available, or handle the request then cache the response
    const cachedResponse = this.cache.get(req);
    this.logger.debug('ApiRequestInterceptor: Request for ' + req.urlWithParams + (cachedResponse ? ' cached' : ' not cached'));
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: ApiRequestCache)
    : Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.ok) {
          cache.put(req, event);
        }
      })
    );
  }

  // Returns whether the HttpRequest path matches one of our cacheable paths
  private shouldCache(req: HttpRequest<any>): boolean {
    const url = req.url;
    return cacheUrls.some(u => url.includes(u));
  }
}
