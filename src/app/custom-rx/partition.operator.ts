import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/map';

type Predicate<T> = (item: T) => boolean;

/**
 * Takes a predicate function used to split the emissions from the source, returning each branch as an Observable
 *
 * @example <caption>Parition into odd and even numbers, squaring even numbers</caption>
 *
 * const oddsAndEvens$ = Observable.of(3,4,5,6,7,8)
 *   .partition(x => x.value %2 === 0);
 *
 * oddsAndEvens$
 * 	 .concatMap((items, idx) => idx === 0 ? items.map(n => n*n) : items)
 *   .subscribe(i => console.log(i));
 * // 16,36,64,3,5,7
 *
 * @param predicate The selector function that will decide which branch to emit each item on
 */
export function partition(predicate) {
    return Observable.create(subscriber => {
        let falses$ = undefined;
        let truths$ = undefined;
        return this.groupBy(predicate, null, null, () => new ReplaySubject()).subscribe(
            grp => {
                if (grp.key) {
                    truths$ = grp;
                } else {
                    falses$ = grp;
                }
                if (truths$) {
                    subscriber.next(truths$);
                    truths$ = null;
                }
                if (falses$ && truths$ === null) {
                    subscriber.next(falses$);
                    falses$ = null;
                }
            },
            err => {
                falses$ = null;
                truths$ = null;
                subscriber.error(err);
            },
            () => {
                if (falses$) {
                    subscriber.next(falses$);
                }
                subscriber.complete();
            }
        );
    });
}
