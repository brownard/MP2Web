import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/api/api.service';
import { AppConfigService } from 'src/app/core/config/app-config.service';
import { Logger } from 'src/app/core/logging/logger.service';
import { WebSortField, WebSortOrder } from 'src/app/core/models/web-media-items';
import { WebChannelBasic, WebChannelDetailed } from '../models/channels';
import { WebChannelPrograms, WebProgramBasic, WebProgramDetailed } from '../models/programs';



@Injectable({
  providedIn: 'root'
})
export class TVAccessService extends ApiService {

  constructor(http: HttpClient, logger: Logger, config: AppConfigService) {
    super(http, logger, config.appConfig.mp2ExtendedBasePath + 'TVAccessService/json/');
  }

  public getChannelsBasic(groupId = '1', sort: WebSortField | '' = '', order: WebSortOrder.Asc | '' = '') {
    return this.getData<WebChannelBasic[]>('GetChannelsBasic', {
      'groupId': groupId,
      'sort': sort,
      'order': order
    });
  }

  public getChannelsDetailed(groupId = '1', sort: WebSortField | '' = '', order: WebSortOrder.Asc | '' = '') {
    return this.getData<WebChannelDetailed[]>('GetChannelsDetailed', {
      'groupId': groupId,
      'sort': sort,
      'order': order
    });
  }

  public getProgramsBasicForGroup(groupId = '1', startTime: Date, endTime: Date) {
    return this.getData<WebChannelPrograms<WebProgramBasic>[]>('GetProgramsBasicForGroup', {
      groupId,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON()
    });
  }

  public getProgramsDetailedForGroup(groupId = '1', startTime: Date, endTime: Date) {
    return this.getData<WebChannelPrograms<WebProgramDetailed>[]>('GetProgramsDetailedForGroup', {
      groupId,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON()
    });
  }
}
