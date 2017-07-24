import { Deferred } from '../promise-exts';
import { Type } from '@angular/core';

export interface Configurable {
    configDone: Promise<void>;
    configure(): void | Promise<void>;
}

export interface ConfigurableImpl {
    _doConfig(): void | Promise<void>;
}

export function MixinConfigurable<T extends Type<ConfigurableImpl>>(Base: T) {
    return class ConfigurableBase extends Base implements Configurable {
        private _defer = Deferred.defer<void>();
        readonly configDone = this._defer.promise;

        async configure() {
            if (this._defer.isDone) { return this._defer.promise; }

            try {
                await this._doConfig();
                this._defer.resolve();
            } catch (error) {
                this._defer.reject(error);
            }
            return this._defer.promise;
        }
    }
}

