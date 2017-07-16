import { Component, OnInit, OnDestroy } from '@angular/core';
import { failRandomly } from './fail-randomly';

@Component({
  template: `
    <h3>Interval error</h3>
    <h4>First subscription</h4>
    <p>
      Result: {{ results }}
    </p>
  `,
  styles: []
})
export class IntervalErrorComponent implements OnInit, OnDestroy {
  results = 0;
  private intervalSubscription: any;
  constructor() { }

  ngOnInit() {
    this.intervalSubscription = setInterval(async () => {
    // errors thrown by `failRandomly` will be sent to global exception handler automatically
      this.results = await failRandomly();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalSubscription);
  }
}
