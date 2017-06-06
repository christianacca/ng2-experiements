import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Human } from './model';

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
        <label>Child Age: <input type="number" #age [value]="childAge"/></label>
        <button type="button" (click)="changeChildAge(age.value)">Change</button>
    </p>
    <p>
        <label>Child IQ: <input type="number" #iq [value]="childIQ"/></label>
        <button type="button" (click)="changeChildIQ(iq.value)">Change</button>
    </p>
    <app-event-child [value]="value.children[0]" [age]="childAge" [iq]="childIQ"></app-event-child>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventParentComponent implements OnInit {
  childIQ: number;
  private _parent: Human;
  childAge: number;
  @Input()
  get value(): Human {
    return this._parent;
  }
  set value(v: Human) {
    this._parent = v;
    this.childAge = v.children[0].age;
    this.childIQ = v.children[0].iq;
  }
  constructor() { }

  ngOnInit() {
  }

  changeChildAge(value: string) {
    this.childAge = parseInt(value, 10);
  }
  changeChildIQ(value: string) {
    this.childIQ = parseInt(value, 10);
  }
}
