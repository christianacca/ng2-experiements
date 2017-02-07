import { Provider, Type, APP_INITIALIZER } from '@angular/core';
import { Bootstrappable } from './bootstrappable';

// function declaration used because of https://github.com/angular/angular/issues/13614
export function runBlockFactory<T extends Bootstrappable>(service: T) {
    return function runBlock() { return service.bootstrap(); };
}

export function provideBootstrappable<T extends Bootstrappable>(Ctor: Type<T>): Provider[] {
    const serviceInit = {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: runBlockFactory,
        deps: [Ctor]
    };
    return [serviceInit, Ctor]
}