import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntervalErrorModel, IntervalErrorModelData } from './interval-error.model';
import 'rxjs/add/operator/map';

@Component({
  template: `
    <h3>Interval error</h3>
    <h4>First subscription</h4>
    <p>
      Random generator: {{ model.results }}
    </p>
    <p>
      <label>
        Interval Frequency: <input type="number" [value]="model.frequency" #freq/>
      </label>
      <a href="" (click)="changeFrequency(freq.value); $event.preventDefault()">Change</a>
    </p>
  `,
  styles: []
})
export class IntervalErrorComponent implements OnInit, OnDestroy {
  model: IntervalErrorModel;
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

  private setState(data: IntervalErrorModelData) {
    this.model = new IntervalErrorModel(data);
    this.model.start();
  }
}


