export interface AsyncResult<K, V> {
    result: Promise<V>,
    key: K;
}
