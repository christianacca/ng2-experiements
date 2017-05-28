import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-counter',
  template: `
    {{value | async}}
  `,
  styles: [`
    :host { display: inline }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() value: Observable<number>;
}
