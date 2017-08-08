import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/race';
import '../custom-rx/add/observable/asyn-results'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncResult } from '../custom-rx/async-results';

interface Attributes {
    [name: string]: any;
    isBlocking: boolean;
}

interface Configurable {
    attributes: Attributes;
    configure(): void | SubscribableOrPromise<void>;
}

const fakeConfig = {
    attributes: {
        isBlocking: false
    },
    configure() {
        // no op
    }
}

const fakeAsyncConfig = {
    attributes: {
        isBlocking: true
    },
    configure() {
        return Observable.empty();
    }
};

const configurable: Configurable[] = [
    fakeConfig,
    fakeAsyncConfig
];


function run2(configurables: Configurable[]) {
    const throwAfter = (timeout: number) => Observable.timer(timeout)
        .switchMap(() => Observable.throw(new Error('Timout')));

    const results$ = Observable.from(configurable)
        .map(c => ({
            key: c.attributes,
            result: Observable.from(c.configure() || Observable.empty()).mapTo(c.attributes).concat([c.attributes]).first()
        }));
    const asyncResults$ = Observable.fromAsynResults(results$);
    const resultsByTimeout$ = asyncResults$.partition({ isBlocking: true })
        .concatMap((obs, idx) => obs.results());

}


function run(configurables: Configurable[]) {
    const configProgress = new ReplaySubject<Configurable>();
    const configurables$ = Observable.from(configurables)
        .mergeMap(c => {
            const result$ = Observable.from(c.configure() || Observable.empty());
            return result$.mapTo(c).concat([c]).first();
        })
        .subscribe(configProgress);
    // return a hot observable
    return configProgress.asObservable();
}
