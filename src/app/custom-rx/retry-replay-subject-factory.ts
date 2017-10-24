import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IScheduler } from 'rxjs/Scheduler';

/**
 * Creates a subject factory that will share the sequence of elements produced by the
 * source Observable, yet allow that source Observable to be retried
 *
 * Supplying the resulting subject factory to the multicast operator is the equivalent
 * of using the shareReplay operator
 *
 * @param bufferSize number of source elements to replay to late subscribers
 * @param windowTime time (ms) to retain source elements to replay to late subscribers
 * @param scheduler
 */
export function retryReplaySubjectFactory<T>(
    bufferSize?: number,
    windowTime?: number,
    scheduler?: IScheduler) {
    let subject;
    return () => {
        if (subject === undefined || subject.closed) {
            subject = new ReplaySubject<T>(bufferSize, windowTime, scheduler);
        }
        return subject;
    };
}
