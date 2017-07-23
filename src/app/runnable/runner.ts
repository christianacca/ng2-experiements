import { Injectable, InjectionToken, APP_INITIALIZER, Provider, Optional } from '@angular/core';
import { asyncInvoke } from '../promise-exts';

export interface IRunnable {
    run(): void | Promise<void>;
}

export interface IConfigurable {
    configure(): void | Promise<void>;
}

export function createConfigAndRunBlock(configurables: IConfigurable[], runnables: IRunnable[], runner: AsyncRunner) {
    return async function configAndRunBlock() {
        await runner.invoke(configurables, c => c.configure());
        await runner.invoke(runnables, r => r.run())
    };
}

export const RUN_BLOCK = new InjectionToken<IRunnable[]>('Run_block');

export const CONFIG_BLOCK = new InjectionToken<IConfigurable[]>('Config_block');


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
