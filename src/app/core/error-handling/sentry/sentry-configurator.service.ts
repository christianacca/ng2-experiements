import { RavenOptions } from 'raven-js/typescript/raven';
import { RavenStatic } from 'raven-js';
import { InjectionToken } from '@angular/core';

export abstract class SentryConfiguratorService {
    abstract onAppStartup(library: RavenStatic): void | Promise<void>;
}
