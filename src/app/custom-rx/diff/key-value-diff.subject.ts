import { KeyValueDiffer, KeyValueChanges } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { KeyValueDiffObservable } from './key-value-diff.observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

export class KeyValueDiffSubject<T extends {}, K extends keyof T = keyof T> extends KeyValueDiffObservable<T, K> {
    private subject = new Subject<KeyValueChanges<K, any>>();
    private manualTrigger = new Subject();

    // tslint:disable-next-line:no-shadowed-variable
    static create<T extends object, K extends keyof T>(
        source: T,
        differ: KeyValueDiffer<K, any>,
        trigger$: Observable<any>) {
        return new KeyValueDiffSubject<T, K>(source, differ, trigger$);
    }

    detectChanges() {
        this.manualTrigger.next();
    }

    private diffs$(trigger$: Observable<any>) {
        return this.manualTrigger.merge(trigger$).switchMap(() => {
            const changes = this.differ.diff(this.value);
            return changes ? Observable.of(changes) : Observable.empty()
        });
    }

    private constructor(
        public value: T,
        private differ: KeyValueDiffer<K, any>,
        trigger$: Observable<any>) {
        super((subscriber: Subscriber<KeyValueChanges<K, any>>) => {
            return this.subject.subscribe(subscriber);
        });
        this.diffs$(trigger$).subscribe(this.subject);
    }
}

