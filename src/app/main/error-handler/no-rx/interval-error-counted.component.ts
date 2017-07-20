import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntervalCountedErrorModel, IntervalCountedErrorModelData } from './interval-counted-error.model';

@Component({
  template: `
    <h3>Interval error (counted)</h3>
    <div>
      <h4>First subscription</h4>
      <p>Succeeded: {{model.results.successCount}}</p>
      <p>Failed: {{model.results.failureCount}}</p>
    </div>
    <p>
      <label>
        Interval Frequency: <input type="number" [value]="model.frequency" #freq/>
      </label>
      <a href="" (click)="changeFrequency(freq.value); $event.preventDefault()">Change</a>
    </p>
  `,
  styles: []
})
export class IntervalErrorCountedComponent implements OnInit, OnDestroy {
  model: IntervalCountedErrorModel;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const data$ = this.route.paramMap
      .map(paramsMap => parseInt(paramsMap.get('frequency'), 10))
      .map(frequency => ({ frequency }));

    data$
      .subscribe(data => {
        this.teardownState();
        this.setState(data);
      });
  }

  ngOnDestroy(): void {
    this.teardownState();
  }

  changeFrequency(frequency: string) {
    this.router.navigate(['.', { frequency }], { relativeTo: this.route })
  }

  private teardownState() {
    if (!this.model) { return; }

    this.model.dispose();
  }

  private setState(data: IntervalCountedErrorModelData) {
    this.model = new IntervalCountedErrorModel(data);
    this.model.start();
  }
}
