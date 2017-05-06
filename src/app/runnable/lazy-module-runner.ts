import { Injectable, Optional, Inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Runner, IRunnable, RUNNABLE } from './runner';

@Injectable()
export class LazyModuleRunner implements Resolve<boolean> {
    private donePromise: Promise<any>;
    private _done = false;
    constructor(private runner: Runner, @Inject(RUNNABLE) @Optional() private runnables: IRunnable[]) { }

    resolve() {
        return this.run();
    }
    run() {
        if (this.donePromise != null) { return this.donePromise; }

        this.donePromise = this.runner.run(this.runnables || []).then(() => {
            this._done = true;
            return this._done;
        });
        return this.donePromise;
    }
    get done(): boolean { return this._done; }
}
