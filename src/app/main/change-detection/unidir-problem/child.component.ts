import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Parent } from './model';

interface Inputs extends SimpleChanges {
  age?: SimpleChange;
}

@Component({
  selector: 'app-unidir-child',
  template: `
    <div>
      <h3>Child (age: {{value.age}})</h3>
      <p>
        <input type="number" #age [value]="value.age"/>
        <button type="button" (click)="changeAge(age.value)">Change</button>
      </p>
    </div>
  `,
  styles: []
})
export class ChildComponent implements OnInit, OnChanges {

  @Input() value: Parent;
  @Input() age: string;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: Inputs): void {
    if (changes.age.isFirstChange()) {
      return;
    }
    this.value.age = parseInt(this.age, 10);
  }

  changeAge(value: string) {
    this.value.age = parseInt(value, 10);
  }

}
