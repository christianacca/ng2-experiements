import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

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
export class CounterComponent implements OnChanges {
  @Input() value: { count: number };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`counter: ${this.value}`);
  }
}
