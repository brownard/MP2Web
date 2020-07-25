import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppConfigService } from './config/app-config.service';
import { ApiRequestInterceptor } from './interceptors/api-request.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      // App initializer that gets the app config file from the server.
      // The factory returns a promise so that Angular waits for it to
      // complete before continuing. This is important to ensure that the
      // config is available before any components that depend on it are created.
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => () => {
        return appConfigService.loadAppConfig();
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
