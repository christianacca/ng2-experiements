import { Injectable, InjectionToken, APP_INITIALIZER, Provider, Optional, Type } from '@angular/core';
import { Deferred } from '../promise-exts';
import { Configurable, ConfigurableAttrs } from './configurable';
import { Startable, StartableAttrs } from './startable';
import { Observable } from 'rxjs/Observable';
import '../custom-rx/add/observable/asyn-results'
import { BootstrapAttrs } from './bootstrap-attrs';


function isConfigurable(item: any): item is Configurable {
    return ('configure' in item);
}

function isStartable(item: any): item is Startable {
    return ('start' in item);
}

export function createConfigAndRunBlock(startables: Array<Startable | Configurable>, runner: Boostrapper) {
    return async function configAndRunBlock() {
        // todo: remove type assertion once webpack uses same version of typescript (2.4.2) which can correctly infer
        const configurable = startables.filter(isConfigurable) as Configurable[];
        const runnable = startables.filter(isStartable) as Startable[];
        const configured$ = runner.run(configurable, c => c.configure(), c => c.attributes || ConfigurableAttrs.defaults);
        await configured$.where({ isBlocking: true }).results().toPromise();
        const started$ = runner.run(runnable, c => c.start(), s => s.attributes || StartableAttrs.defaults);
        await started$.where({ isBlocking: true }).results().toPromise();
    };
}

export const BOOTSTRAPPABLE = new InjectionToken<Array<Startable | Configurable>>('boostapper_block');


@Injectable()
export class Boostrapper {
    run<T, A extends BootstrapAttrs>(commands: T[], method: (cmd: T) => void | Promise<void>, keySelector: (cmd: T) => A) {
        commands = commands || [];
        const results = commands
            .map(cmd => ({
                result: Promise.resolve(method(cmd)),
                key: keySelector(cmd)
            }))
        return Observable.fromAsynResults(results)
    }
}


const configAndRunAllProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: createConfigAndRunBlock,
    deps: [[BOOTSTRAPPABLE, new Optional()], Boostrapper]
};

export const runnerProviders: Provider[] = [
    Boostrapper,
    configAndRunAllProvider
];
