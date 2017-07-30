import { Injectable, InjectionToken, APP_INITIALIZER, Provider, Optional, Type } from '@angular/core';
import { Deferred } from '../promise-exts';
import { Configurable } from './configurable';
import { Startable } from './startable';
import { Observable } from 'rxjs/Observable';
import '../custom-rx/add/observable/asyn-results'


function isConfigurable(item: any): item is Configurable {
    return ('configure' in item);
}

function isRunnable(item: any): item is Startable {
    return ('start' in item);
}

export function createConfigAndRunBlock(startables: Array<Startable | Configurable>, runner: AsyncRunner) {
    return async function configAndRunBlock() {
        // todo: remove type assertion once webpack uses same version of typescript (2.4.2) which can correctly infer
        const configurable = startables.filter(isConfigurable) as Configurable[];
        const runnable = startables.filter(isRunnable) as Startable[];
        const configured$ = runner.run2(configurable, c => c.configure());
        await configured$.where({ isBlocking: true }).results().toPromise()
        return runner.run(runnable, r => r.start())
    };
}

export const STARTABLE = new InjectionToken<Array<Startable | Configurable>>('Run_block');


@Injectable()
export class AsyncRunner {
    async run<T extends { isBlocking?: boolean }>(commands: T[], method: (cmd: T) => void | Promise<void>) {
        commands = commands || [];
        const blockingItems = commands
            .map(cmd => ({
                result: Promise.resolve(method(cmd)),
                key: cmd
            }))
            .filter(r => r.key.isBlocking)
            .map(r => r.result);
        await Promise.all(blockingItems);
    }
    run2<T extends { isBlocking?: boolean }>(commands: T[], method: (cmd: T) => void | Promise<void>) {
        commands = commands || [];
        const results = commands
            .map(cmd => ({
                result: Promise.resolve(method(cmd)),
                key: cmd
            }))
        return Observable.fromAsynResults(results)
    }
}


const configAndRunAllProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: createConfigAndRunBlock,
    deps: [[STARTABLE, new Optional()], AsyncRunner]
};

export const runnerProviders: Provider[] = [
    AsyncRunner,
    configAndRunAllProvider
];
