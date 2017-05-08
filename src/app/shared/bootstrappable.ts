import { Deferred } from './deferred';

export interface Bootstrappable {
    isDone: boolean;
    done: Promise<any>;
    bootstrap(): void | Promise<any>;
}

/**
 * Convenient base class that provides most of the implementation of the {@link Bootstrappable} interface
 */
export abstract class BootstrappableBase implements Bootstrappable {
    isDone = false;
    done: Promise<any>;
    private _deferred: Deferred<any>;
    protected abstract bootstrapImpl(): Promise<any> | void;
    constructor(private serviceName?: string) {
        this._deferred = Deferred.defer();
        this.done = this._deferred.promise;
    }
    bootstrap() {
        console.log(`${this.serviceName}.bootstrap started`);
        let result = this.bootstrapImpl();
        if (!result) {
            result = Promise.resolve(undefined);
        }
        return result
            .then(() => {
                console.log(`${this.serviceName}.bootstrap complete`);
                this.isDone = true;
                this._deferred.resolve(undefined);
            }, this._deferred.reject);
    }
}
