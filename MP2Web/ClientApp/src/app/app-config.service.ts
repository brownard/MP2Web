import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public appConfig: AppConfig;
  public appInstanceId = uuidv4();

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
  streamingServiceStreamPath: string;
}
