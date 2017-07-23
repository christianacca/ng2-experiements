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

export function createConfigAndRunBlock(configurables: Configurable[], runnables: Runnable[], runner: AsyncRunner) {
    return async function configAndRunBlock() {
        await runner.invoke(configurables, c => c.configure());
        await runner.invoke(runnables, r => r.run())
    };
}

export const RUN_BLOCK = new InjectionToken<Runnable[]>('Run_block');

export const CONFIG_BLOCK = new InjectionToken<Configurable[]>('Config_block');


@Injectable()
export class AsyncRunner {
    invoke = asyncInvoke;
}

const configAndRunAllProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: createConfigAndRunBlock,
    deps: [[CONFIG_BLOCK, new Optional()], [RUN_BLOCK, new Optional()], AsyncRunner]
};

export const runnerProviders: Provider[] = [
    AsyncRunner,
    configAndRunAllProvider
];
