import { Component, OnInit, Input } from '@angular/core';
import { Human } from './model';

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
        <label>Child 2 Age: <input type="number" #age [value]="childAge"/></label>
        <button type="button" (click)="changeChildAge(age.value)">Change</button>
    </p>
    <p>
        <label>Child 2 IQ: <input type="number" #iq [value]="childIQ"/></label>
        <button type="button" (click)="changeChildIQ(iq.value)">Change</button>
    </p>
    <p>
        <label>Child 2 Score: <input type="number" #score [value]="childScore"/></label>
        <button type="button" (click)="changeChildScore(score.value)">Change</button>
        <span *ngIf="value.children[1].score > value.children[0].score">!</span>
    </p>
    <app-unidir-child [value]="value.children[0]"></app-unidir-child>
    <app-unidir-child [value]="value.children[1]" [age]="childAge" [iq]="childIQ" [score]="childScore"></app-unidir-child>
  `,
  styles: [`
    :host { display: block; padding-left: 20px;}
  `]
})
export class ParentComponent implements OnInit {
  childIQ: number;
  private _parent: Human;
  childAge: number;
  childScore: number;
  @Input()
  get value(): Human {
    return this._parent;
  }
  set value(v: Human) {
    this._parent = v;
    this.childAge = v.children[1].age;
    this.childIQ = v.children[1].iq;
    this.childScore = v.children[1].score;
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
  changeChildScore(value: string) {
    this.childScore = parseInt(value, 10);
  }
}
