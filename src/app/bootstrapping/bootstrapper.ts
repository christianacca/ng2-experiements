import { Injectable, InjectionToken, APP_INITIALIZER, Provider, Optional, Type } from '@angular/core';
import { Deferred } from '../promise-exts';
import { Configurable } from './configurable';
import { Startable } from './startable';
import { Observable } from 'rxjs/Observable';
import '../custom-rx/add/observable/asyn-results'
import { Bootstrappable } from './bootstrappable';


function isConfigurable(item: any): item is Configurable {
    return ('configure' in item);
}

function isStartable(item: any): item is Startable {
    return ('start' in item);
}

export function createConfigAndRunBlock(bootstrappable: Array<Startable | Configurable>, bootstrapper: Boostrapper) {
    return async function configAndRunBlock() {
        // todo: remove type assertion once webpack uses same version of typescript (2.4.2) which can correctly infer
        const configurable = bootstrappable.filter(isConfigurable) as Configurable[];
        const startable = bootstrappable.filter(isStartable) as Startable[];
        const configured$ = bootstrapper.run(configurable, c => c.configure());
        await configured$.where({ isBlocking: true }).results().toPromise();
        const started$ = bootstrapper.run(startable, c => c.start());
        await started$.where({ isBlocking: true }).results().toPromise();
    };
}

export const BOOTSTRAPPABLE = new InjectionToken<Array<Startable | Configurable>>('boostapper_block');

@Injectable()
export class Boostrapper {
    run<T extends Bootstrappable>(commands: T[], method: (cmd: T) => void | Promise<void>) {
        const results$ = Observable.from(commands || [])
            .map(cmd => ({
                result: Observable.from(method(cmd) || Observable.empty<void>()),
                key: cmd.attributes
            }))
        return Observable.fromAsynResults(results$)
    }
}

const configAndRunAllProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: createConfigAndRunBlock,
    deps: [[BOOTSTRAPPABLE, new Optional()], Boostrapper]
};

export const bootstrapperProviders: Provider[] = [
    Boostrapper,
    configAndRunAllProvider
];
