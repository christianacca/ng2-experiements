import { Component, OnInit, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/audit';

const later = Promise.resolve(null);

@Component({
  selector: 'app-zone-cd',
  template: `
    <h3>Zone Change Detection</h3>
    <p>
      <button type="button" (click)="clicked()">Click Me</button>
    </p>
    <p>
      <button type="button" (click)="schedule(1000)">Schedule Me</button>
    </p>
    <p>
      <button type="button" (click)="schedule(2000)">Schedule Another</button>
    </p>
  `,
  styles: []
})
export class ZoneCdComponent implements OnInit {
  notifier = new Subject<number>();
  notifications = this.notifier.asObservable();

  constructor(ngZone: NgZone) {
    ngZone.onStable.subscribe(_ => {
      console.log('ngZone.onStable')
    });
    ngZone.onUnstable.subscribe(_ => {
      console.log('ngZone.onUnstable')
    });

    this.notifications
      .audit(() => ngZone.onStable)
      .subscribe(n => { console.log(n); });
  }

  ngOnInit() {
  }

  schedule(duration: number) {
    this.notifier.next(-2);

    later.then(() => {
      this.notifier.next(1);
      this.notifier.next(2);
      // later.then(() => {
      //   this.notifier.next(3);
      // });
    });

    later.then(() => {
      this.notifier.next(0);
    });

    setTimeout(() => {
      this.notifier.next(4);
      later.then(() => {
        this.notifier.next(5);
      });
      setTimeout(() => {
        this.notifier.next(7);
      }, 0);
      setTimeout(() => {
        this.notifier.next(8);
      }, 1);
      this.notifier.next(6);
    }, duration);

    this.notifier.next(-1);
  }

  clicked() {
    this.notifier.next(1);
    this.notifier.next(2);
    this.notifier.next(3);
  }

}
