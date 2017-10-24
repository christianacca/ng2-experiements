import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

type SubjectFactory<T> = () => Subject<T>;
type SubjectSelector<T> = () => Subject<T> | SubjectFactory<T>;

/**
 * Cause each inner Observable emitted by the source to start producing immediately. Uses
 * a {@link Subject} for each inner Observable to share the sequence of elements to
 * Observer(s).
 *
 * Each inner Observable returned is ref counted so that they will stop producing when
 * their subscription count drops to 0
 *
 * @example <caption>Prevent dropping values due to `concatAll` subscribing late</caption>
 *
 * const result$ = Rx.Observable.from([
 *   hot('A1', 'A2'),
 *   hot('B1', 'B2')
 * ])
 * .connected(() => new ReplaySubject())
 * .concatAll()
 *
 * --A1--A1
 * --B1--B1
 *  result$:
 * --A1--A1--B1--B1
 *
 * @param this source that will emit other Observables
 * @param innerSubjectSelector Function that will be called for each inner Observable to
 * create a subject or subject factory.
 * The created subject will ensure that the inner sequence of elements are shared with all
 * of their observers
 */
export function connected<T>(this: Observable<Observable<T>>, innerSubjectSelector: SubjectSelector<T>) {
    return this.map(inner => {
        const subjectOrSubjectFactory = innerSubjectSelector();
        const hotInner = inner.multicast(subjectOrSubjectFactory);
        hotInner.connect();
        return hotInner.refCount();
    });
}
