import { Subscribable } from 'rxjs/Observable';

export type AsyncResult<K, V> = ObservableResult<K, V> | PromiseResult<K, V>

export interface ObservableResult<K, V> {
    result: Subscribable<V>,
    key: K;
}

export interface PromiseResult<K, V> {
    result: Promise<V>,
    key: K;
}
