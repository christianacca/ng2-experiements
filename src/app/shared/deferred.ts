export class Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: T) => void;

    static defer<T>(): Deferred<T> {
        return new Deferred<T>();
    }

    constructor() {
        this.promise = new Promise<T>((resolveFn, rejectFn) => {
            this.resolve = resolveFn;
            this.reject = rejectFn;
        });
    }
}
