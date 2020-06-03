import { Injectable } from '@angular/core';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
   
  constructor(private persistanceService: PersistenceService) { }

  themePersistKey = 'app-theme';

  private _currentTheme: string;

  public get currentTheme() { return this._currentTheme; }

  public initTheme(): void {
    let currentTheme = this.persistanceService.get<string>('app-theme');
    if (currentTheme)
      this.setTheme(currentTheme);
  }

  public setTheme(theme: string): boolean {
    this.applyTheme(theme);
    this.persistanceService.persist(this.themePersistKey, theme);
    return true;
  }

  private applyTheme(theme: string): void {
    if (this._currentTheme)
      document.body.classList.remove(this._currentTheme);
    if (theme)
      document.body.classList.add(theme);
    this._currentTheme = theme;
  }
}
