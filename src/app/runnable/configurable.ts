import { Deferred } from '../promise-exts';
import { Type } from '@angular/core';
import { BlockAttributes } from './block-attributes';
import { Phase } from './phase';
import { defaults } from 'lodash-es';


export class ConfigurableAttributes implements BlockAttributes {
    static readonly defaults = new ConfigurableAttributes();
    isBlocking = false;
    phase = Phase.config;
    static create<T extends ConfigurableAttributes = ConfigurableAttributes>(values?: Partial<T>) {
        return defaults<T>(values, ConfigurableAttributes.defaults);
    }
    protected constructor() {}
}
Object.freeze(ConfigurableAttributes.defaults);

export interface Configurable {
    attributes?: BlockAttributes;
    configDone: Promise<void>;
    configure(): void | Promise<void>;
}

export interface ConfigurableImpl {
    _doConfig(): void | Promise<void>;
}

export function MixinConfigurable<T extends Type<ConfigurableImpl>>(Base: T) {
    return class ConfigurableBase extends Base implements Configurable {
        private _defer = Deferred.defer<void>();
        attributes = ConfigurableAttributes.defaults;
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

