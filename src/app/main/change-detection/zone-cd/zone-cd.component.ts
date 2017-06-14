import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-zone-cd',
  template: `
    <h3>Zone Change Detection</h3>
    <p>
      <button type="button" (click)="0;">Click Me</button>
    </p>
  `,
  styles: []
})
export class ZoneCdComponent implements OnInit {

  constructor(ngZone: NgZone) {
    ngZone.onStable.subscribe(_ => {
      console.log('ngZone.onStable')
    });
    ngZone.onUnstable.subscribe(_ => {
      console.log('ngZone.onUnstable')
    });
  }

  ngOnInit() {
  }

}
