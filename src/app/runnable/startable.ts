import { Deferred } from '../promise-exts';
import { Type } from '@angular/core';

export interface Startable {
    isBlocking?: boolean;
    startDone: Promise<void>;
    start(): void | Promise<void>;
}

export interface StartableImpl {
    _doStart(): void | Promise<void>;
}

export function MixinStartable<T extends Type<StartableImpl>>(Base: T) {
    return class StartableBase extends Base implements Startable {
        private _defer = Deferred.defer<void>();
        isBlocking = false;
        readonly startDone = this._defer.promise;

        async start() {
            if (this._defer.isDone) { return this._defer.promise; }

            try {
                await this._doStart();
                this._defer.resolve();
            } catch (error) {
                this._defer.reject(error);
            }
            return this._defer.promise;
        }
    }
}
