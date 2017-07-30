import { Deferred } from '../promise-exts';
import { Type } from '@angular/core';
import { BlockAttributes } from './block-attributes';
import { Phase } from './phase';
import { defaults } from 'lodash-es';

export class StartableAttributes implements BlockAttributes {
    static readonly defaults = new StartableAttributes();
    isBlocking = false;
    phase = Phase.run;
    static create<T extends StartableAttributes = StartableAttributes>(values?: Partial<T>) {
        return defaults<T>(values, StartableAttributes.defaults);
    }
    protected constructor() {}
}
Object.freeze(StartableAttributes.defaults);

export interface Startable {
    attributes?: BlockAttributes;
    startDone: Promise<void>;
    start(): void | Promise<void>;
}

export interface StartableImpl {
    _doStart(): void | Promise<void>;
}

export function MixinStartable<T extends Type<StartableImpl>>(Base: T) {
    return class StartableBase extends Base implements Startable {
        private _defer = Deferred.defer<void>();
        attributes = StartableAttributes.defaults;
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
