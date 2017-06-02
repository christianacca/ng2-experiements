import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Parent } from './model';

@Component({
  selector: 'app-event-parent',
  template: `
    <div>
      <h3>Parent (age: {{value.age}})</h3>
      <p>
        Descendants age: {{value.descendantsAge}}<span *ngIf="value.children[0].isMiddleAge">!</span>
      </p>
    </div>
    <p>
        <label>Child: <input type="number" #age [value]="childAge"/></label>
        <button type="button" (click)="changeChildAge(age.value)">Change</button>
      </p>
    <app-event-child [value]="value.children[0]" [age]="childAge"></app-event-child>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventParentComponent implements OnInit {
  private _value: Parent;
  childAge: number;
  @Input()
  get value(): Parent {
    return this._value;
  }
  set value(v: Parent) {
    this._value = v;
    this.childAge = v.children[0].age;
  }
  constructor() { }

  ngOnInit() {
  }

  changeChildAge(value: string) {
    this.childAge = parseInt(value, 10);
  }
}

