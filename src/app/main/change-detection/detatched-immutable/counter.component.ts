import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-immut-counter',
  template: `
    {{value.count}}
  `,
  styles: [`
    :host { display: inline }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() value: { count: number };
}
