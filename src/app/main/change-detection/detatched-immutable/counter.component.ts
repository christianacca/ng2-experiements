import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

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
export class CounterComponent implements OnChanges, DoCheck {
  @Input() value: { count: number };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`counter: ${this.value}`);
  }
  ngDoCheck(): void {
    console.log(`CounterComponent.ngDoCheck`);
  }
}
