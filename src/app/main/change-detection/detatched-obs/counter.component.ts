import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-counter',
  template: `
    {{value | async}}
  `,
  styles: [`
    :host { display: block }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnChanges {
  @Input() value: Observable<number>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.value = this.value.do(count => console.log(`counter: ${count}`));
  }
}
