import { SentryConfiguratorService, ErrorHandlerModuleInitializer, sentryErrorAppenderProviders } from '../core';
import { RavenStatic } from 'raven-js';
import { Provider } from '@angular/core';
import { STARTABLE } from '../runnable';

export class SentryConfiguratorImplService extends SentryConfiguratorService {
  onAppStartup(library: RavenStatic) {
    library
      .config('https://9087265ea8e54d63b8848c9d7bf104a1@sentry.io/191875')
      .install();
  }
}

export const errorModuleProviders: Provider[] = [
  { provide: STARTABLE, multi: true, useClass: ErrorHandlerModuleInitializer },
  { provide: SentryConfiguratorService, useClass: SentryConfiguratorImplService },
  sentryErrorAppenderProviders
];
