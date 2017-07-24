import { Injectable, InjectionToken, APP_INITIALIZER, Provider, Optional } from '@angular/core';
import { asyncInvoke, Deferrable, ResolveDeferred } from '../promise-exts';

export interface Startable {
    startDone: Promise<void>;
    start(): void | Promise<void>;
}

export interface Configurable {
    configDone: Promise<void>;
    configure(): void | Promise<void>;
}

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
        await runner.invoke(configurable, c => c.configure());
        await runner.invoke(runnable, r => r.start())
    };
}

export const STARTABLE = new InjectionToken<Array<Startable | Configurable>>('Run_block');


@Injectable()
export class AsyncRunner {
    invoke = asyncInvoke;
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
