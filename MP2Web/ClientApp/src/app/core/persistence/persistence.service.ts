import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  public persist<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | undefined {
    let value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }
}
