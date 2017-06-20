import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventsService {
    private iqChangeSubject = new Subject<number>();
    private iqChangeRequestSubject = new Subject<boolean>();
    iqChanges$ = this.iqChangeSubject.asObservable();
    iqChangeRequests$ = this.iqChangeRequestSubject.asObservable();
    private counter = 0;

    notifyIQChange() {
        this.iqChangeSubject.next(++this.counter);
    }
    requestIQChange() {
        this.iqChangeRequestSubject.next(true);
    }
}
