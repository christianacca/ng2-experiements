import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsService {
    iqChangeSubject = new Subject<number>();
    iqChanges$ = this.iqChangeSubject.asObservable();
    private counter = 0;

    notifyIQChange() {
        this.iqChangeSubject.next(++this.counter);
    }
}
