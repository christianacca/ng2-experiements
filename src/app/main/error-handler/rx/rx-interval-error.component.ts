import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import { RxIntervalErrorModel } from './rx-interval-error.model';

@Component({
  template: `
    <ng-container *rxContext="let model on model$">
      <h3>RxJs Interval error</h3>
      <h4>First subscription</h4>
      <p>
        Result: {{ model.results$ | async }}
      </p>
      <h4>Second subscription</h4>
      <p>
        Result: {{ model.results$ | async }}
      </p>
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
export class RxIntervalErrorComponent implements OnInit {
  model$: Observable<RxIntervalErrorModel>;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const data$ = this.route.paramMap
      .map(paramsMap => parseInt(paramsMap.get('frequency'), 10))
      .map(frequency => ({ frequency }));

    this.model$ = data$
      .map(data => new RxIntervalErrorModel(data));
  }

  changeFrequency(frequency: string) {
    this.router.navigate(['.', { frequency }], { relativeTo: this.route })
  }
}
