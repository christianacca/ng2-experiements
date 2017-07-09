import { InjectionToken } from '@angular/core'

export interface ErrorAppenderService {
    append(error: any);
}

export const ERROR_APPENDERS = new InjectionToken('error appenders');
