import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-counter',
  template: `
    {{value | async}}
  `,
  styles: [`
    :host { display: inline }
  `]
})
export class CounterComponent {
  @Input() value: Observable<number>;
}
