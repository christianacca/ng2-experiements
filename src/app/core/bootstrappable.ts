import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise'
import { Deferrable, ResolveDeferred } from '../core/deferrable.decorator';

export interface Bootstrappable {
    done: Promise<void>;
    bootstrap(): void | Promise<void>;
}

/**
 * Convenient base class that provides most of the implementation of the {@link Bootstrappable} interface
 */
@Deferrable()
export class Bootstrappable {
    @ResolveDeferred()
    async bootstrap() {
        // override in subclass
    }
}
