import { Deferred } from '../promise-exts';
import { Type } from '@angular/core';
import { BootstrapAttrs } from './bootstrap-attrs';
import { Phase } from './phase';
import { defaults } from 'lodash-es';
import { Bootstrappable } from './bootstrappable';


export class ConfigurableAttrs implements BootstrapAttrs {
    static readonly defaults = new ConfigurableAttrs();
    isBlocking = false;
    phase = Phase.config;
    static create<T extends ConfigurableAttrs = ConfigurableAttrs>(values?: Partial<T>) {
        return defaults<T>(values, ConfigurableAttrs.defaults);
    }
    protected constructor() {}
}
Object.freeze(ConfigurableAttrs.defaults);

export abstract class Configurable implements Bootstrappable {
    attributes = ConfigurableAttrs.defaults;
    configDone: Promise<void>;
    abstract configure(): void | Promise<void>;
}

export interface ConfigurableImpl {
    _doConfig(): void | Promise<void>;
}

export function MixinConfigurable<T extends Type<ConfigurableImpl>>(Base: T) {
    return class ConfigurableBase extends Base implements Configurable {
        private _defer = Deferred.defer<void>();
        attributes = ConfigurableAttrs.defaults;
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

