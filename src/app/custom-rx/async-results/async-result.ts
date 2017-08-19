import { Observable } from 'rxjs/Observable';

export interface AsyncResult<K, V> {
    result: Observable<V>,
    key: K;
}
