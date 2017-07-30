import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

export type ObservableType<T> = new (subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => Observable<T>;

export function MixinChainable<T>(Base: ObservableType<T>) {
    return class Chainable extends Base {
        private Ctor: ObservableType<T>;
        constructor(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) {
            super(subscribe);
            this.Ctor = new.target;
        }
        chain<R extends Observable<T>>(func: (selector: this) => R): this {
            return new this.Ctor(subscriber => {
                return func(this).subscribe(subscriber);
            }) as any;
        }
    }
}
