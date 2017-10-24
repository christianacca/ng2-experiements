import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/race';
import '../custom-rx/add/observable/asyn-results'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AsyncResult } from '../custom-rx/async-results';

interface Attributes {
    isBlocking: boolean;
    group?: string;
}

interface Boostrappable {
    attributes: Attributes;
}

type MaybeAsyncVoid = void | SubscribableOrPromise<void>

interface Configurable extends Boostrappable {
    configure(): MaybeAsyncVoid;
}

interface Startable extends Boostrappable {
    start(): MaybeAsyncVoid;
}

const fakeConfig = {
    attributes: {
        isBlocking: false
    },
    configure() {
        // no op
    }
}

const fakeAsyncConfig: Configurable = {
    attributes: {
        isBlocking: true,
        group: 'security'
    },
    configure() {
        return Observable.empty();
    }
};

const configurable: Configurable[] = [
    fakeConfig,
    fakeAsyncConfig
];


function isConfigurable(item: any): item is Configurable {
    return ('configure' in item);
}

function isStartable(item: any): item is Startable {
    return ('start' in item);
}

function run2(bootstrappable: Array<Startable | Configurable>) {
    const throwAfter = (timeout: number) => Observable.timer(timeout)
        .switchMap(() => Observable.throw(new Error('Timout')));

    // todo: remove type assertion once webpack uses same version of typescript (2.4.2) which can correctly infer
    const configurables = bootstrappable.filter(isConfigurable) as Configurable[];
    const startables = bootstrappable.filter(isStartable) as Startable[];

    const asyncConfigResults$ = toAsyncResults(configurables, c => c.configure());
    const asyncStartResults$ = toAsyncResults(startables, c => c.start());
    const resultsByTimeout$ = asyncConfigResults$
        .partitionByKey({ isBlocking: true })
        .concatMap((configs$, idx) => configs$.results());

}

enum Phase {
    config,
    run
}

interface Command {
    key: Attributes & { phase: Phase };
    action: () => MaybeAsyncVoid;
}

function createConfigAndRunCommands<T extends Startable | Configurable>(b: T): Command[] {
    return [
        isConfigurable(b)
            ? {
                key: { ...b.attributes, phase: Phase.config },
                action: () => b.configure()
            }
            : null,
        isStartable(b)
            ? {
                key: { ...b.attributes, phase: Phase.run },
                action: () => b.start()
            }
            : null
    ].filter(cmd => !!cmd);
}

function runCommands(cmds$: Observable<Command>) {
    return cmds$.mergeMap(cmd => {
        const result$ = Observable.from(cmd.action() || Observable.empty());
        return result$.mapTo(cmd.key).concat([cmd.key]).first();
    });
}

function run3(bootstrappable: Array<Startable | Configurable>) {
    const notifications$ = Observable.from(bootstrappable)
        .mergeMap(createConfigAndRunCommands)
        .groupBy(x => x.key.group)
        .mergeMap(grp => {
            const sharedGrp = grp.publishReplay().refCount();
            const results$ = Observable.from([
                sharedGrp.filter(x => x.key.phase === Phase.config),
                sharedGrp.filter(x => x.key.phase === Phase.run)
            ]).concatMap(runCommands)
            return results$;
        });
}

function run4(bootstrappable: Array<Startable | Configurable>) {
    const notifications$ = Observable.from(bootstrappable)
        .mergeMap(createConfigAndRunCommands)
        .groupBy(x => x.key.group)
        .mergeMap(grp => {
            const phases$ = grp.groupBy(x => x.key.phase === Phase.config, null, null, () => new ReplaySubject())
            const sharedGrp = grp.publishReplay().refCount();
            const results$ = Observable.from([
                sharedGrp.filter(x => x.key.phase === Phase.config),
                sharedGrp.filter(x => x.key.phase === Phase.run)
            ]).concatMap(runCommands)
            return results$;
        });
}

function toAsyncResults<T extends Boostrappable>(boostrappable: T[], action: (item: T) => MaybeAsyncVoid) {
    const source$ = Observable.from(boostrappable)
        .map(item => ({
            key: item.attributes,
            result: Observable.from(action(item) || Observable.empty()).mapTo(item.attributes).concat([item.attributes]).first()
        }));
    return Observable.fromAsyncResults(source$);
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
