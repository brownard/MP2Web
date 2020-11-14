import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/api/api.service';
import { AppConfigService } from 'src/app/core/config/app-config.service';
import { Logger } from 'src/app/core/logging/logger.service';
import { WebBoolResult, WebSortField, WebSortOrder } from 'src/app/core/models/web-media-items';
import { WebChannelBasic, WebChannelDetailed, WebChannelGroup } from '../models/channels';
import { WebChannelPrograms, WebProgramBasic, WebProgramDetailed } from '../models/programs';
import { WebScheduleBasic, WebScheduleType } from '../models/schedules';

@Injectable({
  providedIn: 'root'
})
export class TVAccessService extends ApiService {

  constructor(http: HttpClient, logger: Logger, config: AppConfigService) {
    super(http, logger, config.appConfig.mp2ExtendedBasePath + 'TVAccessService/json/');
  }

  public getGroups(sort: WebSortField | '' = '', order: WebSortOrder | '' = ''): Observable<WebChannelGroup[]> {
    return this.getData<WebChannelGroup[]>('GetGroups', { sort, order });
  }

  public getChannelsBasic(groupId: string | number = '1', sort: WebSortField | '' = '', order: WebSortOrder | '' = ''): Observable<WebChannelBasic[]> {
    return this.getData<WebChannelBasic[]>('GetChannelsBasic', { groupId, sort, order });
  }

  public getChannelsDetailed(groupId = 1, sort: WebSortField | '' = '', order: WebSortOrder | '' = ''): Observable<WebChannelDetailed[]> {
    return this.getData<WebChannelDetailed[]>('GetChannelsDetailed', { groupId, sort, order });
  }

  public getChannelBasicById(channelId: number): Observable<WebChannelBasic> {
    return this.getData<WebChannelDetailed>('GetChannelBasicById', { channelId });
  }

  public getChannelDetailedById(channelId: number): Observable<WebChannelDetailed> {
    return this.getData<WebChannelDetailed>('GetChannelDetailedById', { channelId });
  }

  public getProgramsBasicForGroup(groupId = 1, startTime: Date, endTime: Date): Observable<WebChannelPrograms<WebProgramBasic>[]> {
    return this.getData<WebChannelPrograms<WebProgramBasic>[]>('GetProgramsBasicForGroup', {
      groupId,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON()
    });
  }

  public getProgramsDetailedForGroup(groupId = 1, startTime: Date, endTime: Date): Observable<WebChannelPrograms<WebProgramDetailed>[]> {
    return this.getData<WebChannelPrograms<WebProgramDetailed>[]>('GetProgramsDetailedForGroup', {
      groupId,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON()
    });
  }

  public getProgramsDetailedForChannel(channelId: string | number, startTime: Date, endTime: Date): Observable<WebProgramDetailed[]> {
    return this.getData<WebProgramDetailed[]>('GetProgramsDetailedForChannel', {
      channelId,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON()
    });
  }

  public getProgramDetailedById(programId: number): Observable<WebProgramDetailed> {
    return this.getData<WebProgramDetailed>('GetProgramDetailedById', { programId });
  }

  public getSchedules(sort: WebSortField | '' = '', order: WebSortOrder | '' = '', filter: string = ''): Observable<WebScheduleBasic[]> {
    return this.getData<WebScheduleBasic[]>('GetSchedules', { sort, order, filter });
  }

  public getScheduleById(scheduleId: string | number): Observable<WebScheduleBasic> {
    return this.getData<WebScheduleBasic>('GetScheduleById', { scheduleId });
  }

  public addSchedule(channelId: string | number, title: string, startTime: Date, endTime: Date, scheduleType: WebScheduleType): Observable<WebBoolResult> {
    return this.getData<WebBoolResult>('AddSchedule', {
      channelId,
      title,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON(),
      scheduleType
    });
  }

  public addScheduleDetailed(channelId: string | number, title: string, startTime: Date, endTime: Date, scheduleType: WebScheduleType,
    preRecordInterval: number, postRecordInterval: number, directory: string, priority: number): Observable<WebBoolResult> {
    return this.getData<WebBoolResult>('AddScheduleDetailed', {
      channelId,
      title,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON(),
      scheduleType,
      preRecordInterval,
      postRecordInterval,
      directory,
      priority
    });
  }
  
  public cancelSchedule(programId: string | number): Observable<WebBoolResult> {
    return this.getData<WebBoolResult>('CancelSchedule', { programId });
  }

  public unCancelSchedule(programId: string | number): Observable<WebBoolResult> {
    return this.getData<WebBoolResult>('UnCancelSchedule', { programId });
  }

  public editSchedule(scheduleId: string | number, channelId?: string | number, title?: string, startTime?: Date, endTime?: Date,
    scheduleType?: WebScheduleType, preRecordInterval?: number, postRecordInterval?: number, directory?: string, priority?: number): Observable<WebBoolResult> {
    return this.getData<WebBoolResult>('EditSchedule', {
      scheduleId,
      channelId,
      title,
      startTime: startTime.toJSON(),
      endTime: endTime.toJSON(),
      scheduleType,
      preRecordInterval,
      postRecordInterval,
      directory,
      priority
    });
  }

  public deleteSchedule(scheduleId: string | number): Observable<WebBoolResult> {
    return this.getData('DeleteSchedule', { scheduleId });
  }

  public getProgramIsScheduled(programId: string | number): Observable<WebBoolResult> {
    return this.getData<WebBoolResult>('GetProgramIsScheduled', { programId });
  }
}
