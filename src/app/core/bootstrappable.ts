import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise'

export interface Bootstrappable {
    isDone: boolean;
    done: Promise<void>;
    bootstrap(): void | Promise<void>;
}

/**
 * Convenient base class that provides most of the implementation of the {@link Bootstrappable} interface
 */
export abstract class BootstrappableBase implements Bootstrappable {
    isDone = false;
    done: Promise<void>;
    private _deferred = new Subject<void>();

    protected abstract bootstrapImpl(): Promise<void> | void;
    constructor(private serviceName?: string) {
        this.done = this._deferred.toPromise();
    }
    async bootstrap() {
        console.log(`${this.serviceName}.bootstrap started`);
        try {
            const result = await this.bootstrapImpl();
            console.log(`${this.serviceName}.bootstrap complete`);
            this.isDone = true;
            this._deferred.next();
            this._deferred.complete();
        } catch (error) {
            this._deferred.error(error)
        }
    }
}
