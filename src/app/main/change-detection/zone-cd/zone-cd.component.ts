import { Component, OnInit, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/buffer';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-zone-cd',
  template: `
    <h3>Zone Change Detection</h3>
    <p>
      <button type="button" (click)="clicked()">Click Me</button>
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
      .buffer(ngZone.onStable)
      .filter(buffer => !!buffer.length)
      .map(buffer => buffer[buffer.length - 1])
      .subscribe(n => { console.log(n); });
  }

  ngOnInit() {
  }

  clicked() {
    this.notifier.next(1);
    this.notifier.next(2);
    this.notifier.next(3);
  }

}
