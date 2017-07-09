import { Injectable, Inject, NgZone } from '@angular/core';
import { ErrorAppenderService, ERROR_APPENDERS } from './error-appender.service';
import { ConsoleErrorAppenderService } from './console-error-appender.service';
import { ERROR_ORIGINAL_ERROR } from './ng-error-handler';

@Injectable()
export class ErrorLoggerService {

  /**
   * @param errorAppenders
   *  Collecton of appenders to write to for the error being logged
   * @param fallbackErrorAppender
   *  Appender that should be used to record errors that other appenders themselves throw
   *  The assumption is that this appender will run without itself throwing an error
   */
  constructor(
    @Inject(ERROR_APPENDERS) private errorAppenders: ErrorAppenderService[],
    private fallbackErrorAppender: ConsoleErrorAppenderService,
    private ngZone: NgZone) { }

  log(error: any) {
    // don't want error logging to cause further change detection runs
    this.ngZone.runOutsideAngular(() => {
      this.errorAppenders.forEach(appender => this.tryAppendError(error, appender));
    });
  }

  private tryAppendError(error: any, appender: ErrorAppenderService) {
    try {
      appender.append(error);
    } catch (appenderError) {
      appenderError[ERROR_ORIGINAL_ERROR] = error;
      // log error thrown whilst logging error!
      if (this.fallbackErrorAppender !== appender) {
        try {
          this.fallbackErrorAppender.append(error);
        } catch (error) {
          // we're swallowing error here - error logging should not itself cause
          // the application to fail due to cycles in errors
        }
      }
    }
  }
}
