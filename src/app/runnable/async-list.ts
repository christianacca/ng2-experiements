import { Observable } from 'rxjs/Observable';

interface AsyncResult<T, R> {
    result: Promise<R>,
    item: T;
}

const promiseResults: AsyncResult<object, void>[] = [{
    result: Promise.resolve(),
    item: {}
}];

class AsyncList<T, R = void> {
    items: AsyncResult<T, R>[];
    constructor(items: AsyncResult<T, R>[]) {
        this.items = Array.from(items);
    }

    results() {
        return this.items.map(i => i.result);
    }

    reduce() {
        return Promise.all(this.results());
    }
}
