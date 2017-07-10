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
    // run outside of angular:
    // * don't want error logging to cause further change detection runs
    // * avoid errors during logging to result in potentially inifinte loops
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
          // todo: consider "pushing" this event to the global error handler for the
          // environment we're running in (eg browser or web worker or server-side nodejs)
        }
      }
    }
  }
}
