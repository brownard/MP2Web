import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 300000;

interface CacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

// Service that can cache and retrieve HttpRequests.
@Injectable({
  providedIn: 'root'
})
export class ApiRequestCache {

  constructor() { }

  cache = new Map<string, CacheEntry>();

  // If a response has been cached for this request, returns it, else returns undefined.
  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }
    
    const isExpired = cached.lastRead < (Date.now() - maxAge);
    return isExpired ? undefined : cached.response;
  }

  // Adds a response to the cache for the specified request
  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // Clear any expired entries from the cache
    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
