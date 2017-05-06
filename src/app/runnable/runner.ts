import { Injectable, InjectionToken, Type } from '@angular/core';
import { isPromise } from '../shared';

export interface IRunnable {
    run(): void | Promise<any>;
}
export function runAll(runnables: IRunnable[], runner: Runner) {
    return function runBlock() { return runner.run(runnables); };
}
export const RUNNABLE = new InjectionToken<IRunnable[]>('Runnables');

@Injectable()
export class Runner {
    run(runnables: IRunnable[]): Promise<any> {
        runnables = runnables.filter(r => r != null);
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
