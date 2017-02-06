import { APP_INITIALIZER, Provider, Type } from '@angular/core';

import { Bootstrappable } from './bootstrappable';

export function provideBootstrappable<T extends Bootstrappable>(Ctor: Type<T>): Provider[] {
    const serviceInit = {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (service: T) => function runBlock() { return service.bootstrap(); },
        deps: [Ctor]
    };
    return [serviceInit, Ctor]
}