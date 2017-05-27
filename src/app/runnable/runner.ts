import { Injectable, InjectionToken, Type, APP_INITIALIZER, Provider, Optional } from '@angular/core';
import { isPromise } from '../core';

export interface IRunnable {
    run(): void | Promise<any>;
}

// exported to make AOT happy
export function runAll(runnables: IRunnable[], runner: Runner) {
    return function runBlock() { return runner.run(runnables || []); };
}

export const RUNNABLE = new InjectionToken<IRunnable[]>('Runnables');


@Injectable()
export class Runner {
    run(runnables: IRunnable[]): Promise<any> {
        const asyncRunPromises: Promise<any>[] = [];
        for (let i = 0; i < runnables.length; i++) {
            const runResult = runnables[i].run();
            if (isPromise(runResult)) {
                asyncRunPromises.push(runResult);
            }
        }
        return Promise.all(asyncRunPromises);
    }
}

const runAllProvider: Provider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: runAll,
    deps: [[RUNNABLE, new Optional()], Runner]
};

export const runnerProviders: Provider[] = [
    Runner,
    runAllProvider
];
