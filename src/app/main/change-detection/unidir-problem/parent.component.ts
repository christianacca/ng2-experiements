import { Component, OnInit, Input } from '@angular/core';
import { Parent } from './model';

@Component({
  selector: 'app-unidir-parent',
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
    <app-unidir-child [value]="value.children[0]" [age]="childAge"></app-unidir-child>
  `,
  styles: []
})
export class ParentComponent implements OnInit {
  private _parent: Parent;
  childAge: number;
  @Input()
  get value(): Parent {
    return this._parent;
  }
  set value(v: Parent) {
    this._parent = v;
    this.childAge = v.children[0].age;
  }
  constructor() { }

  ngOnInit() {
  }

  changeChildAge(value: string) {
    this.childAge = parseInt(value, 10);
  }
}
