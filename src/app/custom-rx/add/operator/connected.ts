import { Observable } from 'rxjs/Observable';
import { connected } from '../../connected.operator';

declare module 'rxjs/Observable' {
    // tslint:disable-next-line:no-shadowed-variable
    interface Observable<T> {
        connected: typeof connected;
    }
}

Observable.prototype.connected = connected;
