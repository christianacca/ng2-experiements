import { Provider, Type, APP_INITIALIZER } from '@angular/core';
import { Bootstrappable } from './bootstrappable';

export function runBlockFactory<T extends Bootstrappable>(service: T) {
    return function runBlock() { return service.bootstrap(); };
}

/**
 * Creates the provider used to register a {@link Bootstrappable} service
 * note: not yet in - waiting on https://github.com/angular/angular/issues/13614 to be resolved
 * @param Ctor The constructor of the {@link Bootstrappable} service to provide
 */
export function provideBootstrappable<T extends Bootstrappable>(Ctor: Type<T>): Provider[] {
    const serviceInit = {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: runBlockFactory,
        deps: [Ctor]
    };
    return [serviceInit, Ctor];
}
