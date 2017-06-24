import { Component, OnInit, Input, ChangeDetectionStrategy, DoCheck, AfterViewChecked } from '@angular/core';
import { Human } from './model';
import { int } from '../../../core';

@Component({
  selector: 'app-event-parent',
  template: `
    <div>
      <h3>Parent (age: {{value.age}})</h3>
      <p>
        Descendants age: {{value.descendantsAge}}
        <span *ngIf="value.hasMiddleAgeDescendant">!</span>
        <!-- {{value.hasMiddleAgeDescendant ? '!': ''}} -->
      </p>
    </div>
    <p>
        <label>Child 2 Age: <input type="number" #age [value]="childAge"/></label>
        <button type="button" (click)="childAge = age.value;">Change</button>
    </p>
    <p>
        <label>Child 2 IQ: <input type="number" #iq [value]="childIQ"/></label>
        <button type="button" (click)="childIQ = iq.value;">Change</button>
    </p>
    <p>
        <label>Child 2 Score: <input type="number" #score [value]="childScore"/></label>
        <button type="button" (click)="childScore = score.value;">Change</button>
        <span *ngIf="value.children[1].score > value.children[0].score">(Highest)</span>
    </p>
    <app-event-child [value]="value.children[0]" [ageIncrement]=ageIncrement></app-event-child>
    <app-event-child [value]="value.children[1]" [age]="childAge" [iq]="childIQ" [score]="childScore"></app-event-child>
  `,
  styles: [`
    :host { display: block; padding-left: 20px;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventParentComponent implements OnInit, DoCheck, AfterViewChecked {
  @int childIQ: number;
  private _parent: Human;
  @int childAge: number;
  @int childScore: number;
  @Input() ageIncrement = 0;
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
  ngAfterViewChecked(): void {
    console.log(`EventParentComponent.ngAfterViewChecked (age: ${this.value.age})`);
  }
  ngDoCheck(): void {
    console.log(`EventParentComponent.ngDoCheck (age: ${this.value.age})`);
  }
}
