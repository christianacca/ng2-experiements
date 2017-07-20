import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { RxIntervalCountedErrorModel } from './rx-interval-counted-error.model';

@Component({
  template: `
    <ng-container *rxContext="let model on model$">
      <h3>RxJs Interval error (counted)</h3>
      <div *rxContext="let result on model.results$">
        <h4>First subscription</h4>
        <p>Succeeded: {{result.successCount}}</p>
        <p>Failed: {{result.failureCount}}</p>
      </div>
      <div *rxContext="let result on model.results$">
        <h4>Second subscription</h4>
        <p>Succeeded: {{result.successCount}}</p>
        <p>Failed: {{result.failureCount}}</p>
      </div>
      <p>
        <label>
          Interval Frequency: <input type="number" [value]="model.frequency" #freq/>
        </label>
        <a href="" (click)="changeFrequency(freq.value); $event.preventDefault()">Change</a>
      </p>
    </ng-container>
  `,
  styles: []
})
export class IntervalErrorCountedComponent implements OnInit {
  model$: Observable<RxIntervalCountedErrorModel>;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const data$ = this.route.paramMap
      .map(paramsMap => parseInt(paramsMap.get('frequency'), 10))
      .map(frequency => ({ frequency }));

    this.model$ = data$
      .map(data => new RxIntervalCountedErrorModel(data));
  }

  changeFrequency(frequency: string) {
    this.router.navigate(['.', { frequency }], { relativeTo: this.route })
  }
}
