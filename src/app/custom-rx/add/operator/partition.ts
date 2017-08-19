import { Observable} from 'rxjs/Observable';
import { partition } from '../../partition.operator';

declare module 'rxjs/Observable' {
    // tslint:disable-next-line:no-shadowed-variable
    interface Observable<T> {
        partition: typeof partition;
    }
}

Observable.prototype.partition = partition;
