import { Component, OnInit, OnDestroy } from '@angular/core';
import { failRandomly } from './fail-randomly';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  template: `
    <h3>Interval error</h3>
    <h4>First subscription</h4>
    <p>
      Random generator: {{ results }}
    </p>
    <p>
      <label>
        Interval Frequency: <input type="number" [(ngModel)]="intervalFrequency"/>
      </label>
      <a [routerLink]="['.', { intervalFrequency: intervalFrequency}]">Change</a>
    </p>
  `,
  styles: []
})
export class IntervalErrorComponent implements OnInit, OnDestroy {
  results: number;
  intervalFrequency: number;
  private intervalSubscription: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const frequency$ = this.route.paramMap
      .map(paramsMap => parseInt(paramsMap.get('intervalFrequency'), 10) || 1000);

    frequency$
      .subscribe(intervalFrequence => {
        this.teardownState();
        this.setState(intervalFrequence);
      });
  }

  private teardownState() {
    if (!this.intervalSubscription) {
      return;
    }
    clearInterval(this.intervalSubscription);
    this.results = undefined;
  }

  private setState(intervalFrequency: number) {
    this.intervalFrequency = intervalFrequency;
    this.startWorkOnInterval(intervalFrequency);
  }

  private startWorkOnInterval(frequency: number) {
    this.results = 0;
    this.intervalSubscription = setInterval(async () => {
      // errors thrown by `failRandomly` will be sent to global exception handler automatically
      this.results = await failRandomly();
    }, frequency);
  }

  ngOnDestroy(): void {
    this.teardownState();
  }
}


