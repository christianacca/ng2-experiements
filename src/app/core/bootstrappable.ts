import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise'
import { Deferrable, ResolveDeferred } from '../promise-exts';

export interface Bootstrappable {
    readonly done: Promise<void>;
    bootstrap(): void | Promise<void>;
}
