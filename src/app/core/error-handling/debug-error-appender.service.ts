import { ErrorAppenderService, ERROR_APPENDERS } from './error-appender.service';
import { Provider } from '@angular/core';

export class DebugErrorAppenderService implements ErrorAppenderService {
    append(error: any) {
        alert(error.toString());
    }
}

export const debugErrorAppenderProvider: Provider = {
  provide: ERROR_APPENDERS,
  useClass: DebugErrorAppenderService,
  multi: true
};
