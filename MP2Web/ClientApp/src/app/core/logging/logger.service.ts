import { Injectable } from '@angular/core';

export enum LogLevel {
  None = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4
}

@Injectable({
  providedIn: 'root'
})
export class Logger {

  protected level: LogLevel = LogLevel.Debug;

  constructor() { }

  public log(level: LogLevel, message: any, ...optionalParams: any[]) {
    if (!this.shouldLog(level))
      return;

    switch (level) {
      case LogLevel.Error:
        console.error(message, ...optionalParams);
        break;
      case LogLevel.Warn:
        console.warn(message, ...optionalParams);
        break;
      case LogLevel.Info:
        console.info(message, ...optionalParams);
        break;
      case LogLevel.Debug:
        console.debug(message, ...optionalParams);
        break;
    }
  }

  public debug(message: any, ...optionalParams: any[]) {
    this.log(LogLevel.Debug, message, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]) {
    this.log(LogLevel.Error, message, ...optionalParams);
  }

  public info(message: any, ...optionalParams: any[]) {
    this.log(LogLevel.Info, message, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]) {
    this.log(LogLevel.Warn, message, ...optionalParams);
  }

  protected shouldLog(level: LogLevel): boolean {
    return level !== LogLevel.None && level <= this.level;
  }
}
