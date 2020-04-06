import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public appConfig: AppConfig;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  loadAppConfig() {
    return this.http.get<AppConfig>(this.baseUrl + 'assets/app.config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }
}

export interface AppConfig {
  mp2ExtendedBasePath: string;
  mediaAccessServicePath: string;
  streamingServicePath: string;
}
