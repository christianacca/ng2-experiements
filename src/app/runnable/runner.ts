import { Injectable, InjectionToken, APP_INITIALIZER, Provider, Optional } from '@angular/core';
import { asyncInvoke, Deferrable, ResolveDeferred } from '../promise-exts';

export interface Runnable {
    readonly runDone: Promise<void>;
    run(): void | Promise<void>;
}

/**
 * Convenient base class that provides most of the implementation of the {@link Runnable} interface
 */
@Deferrable<Runnable>('runDone')
export class Runnable {
    @ResolveDeferred()
    run() {
        // override in subclass
    }
}

export interface Configurable {
    readonly configDone: Promise<void>;
    configure(): void | Promise<void>;
}

/**
 * Convenient base class that provides most of the implementation of the {@link Configurable} interface
 */
@Deferrable<Configurable>('configDone')
export class Configurable {
    @ResolveDeferred()
    async configure() {
        // override in subclass
    }
}

function isConfigurable(item: any): item is Configurable {
    return ('configure' in item);
}

function isRunnable(item: any): item is Runnable {
    return ('run' in item);
}

export function createConfigAndRunBlock(startables: Array<Runnable | Configurable>, runner: AsyncRunner) {
    return async function configAndRunBlock() {
        // todo: remove type assertion once webpack uses same version of typescript (2.4.2) which can correctly infer
        const configurable = startables.filter(isConfigurable) as Configurable[];
        const runnable = startables.filter(isRunnable) as Runnable[];
        await runner.invoke(configurable, c => c.configure());
        await runner.invoke(runnable, r => r.run())
    };
}

export const STARTABLE = new InjectionToken<Array<Runnable | Configurable>>('Run_block');


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
