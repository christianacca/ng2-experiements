import { Component, OnInit, OnDestroy } from '@angular/core';
import { failRandomly } from './fail-randomly';

interface Record {
  successCount: number;
  failureCount: number
};

async function recorded(state: Record, source: () => Promise<any>) {
  try {
    await source();
    state.successCount += 1;
  } catch (error) {
    state.failureCount += 1;
    // throw to ensure error is NOT silently swallowed but sent to global exception handler
    throw error;
  }
}

@Component({
  template: `
    <h3>Interval error (counted)</h3>
    <div>
      <h4>First subscription</h4>
      <p>Succeeded: {{results.successCount}}</p>
      <p>Failed: {{results.failureCount}}</p>
    </div>
  `,
  styles: []
})
export class IntervalErrorCountedComponent implements OnInit, OnDestroy {
  results = { successCount: 0, failureCount: 0 };
  private intervalSubscription: any;
  constructor() { }

  ngOnInit() {
    this.intervalSubscription = setInterval(
      () => recorded(this.results, failRandomly)
      , 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalSubscription);
  }
}
