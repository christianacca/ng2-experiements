import {
  Component, OnInit, Input, ChangeDetectionStrategy, DoCheck, AfterViewChecked, ChangeDetectorRef, KeyValueDiffers, KeyValueDiffer
} from '@angular/core';
import { Human } from './model';
import { Int, TreeChangeDetectorRef } from '../../../core';

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
    <app-event-child [value]="value.children[0]"
      [ageIncrement]="ageIncrement"
      [grandparentHairColor]="grandparentHairColor"></app-event-child>
    <app-event-child [value]="value.children[1]" [age]="childAge" [iq]="childIQ" [score]="childScore"></app-event-child>
  `,
  styles: [`
    :host { display: block; padding-left: 20px;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventParentComponent implements OnInit, DoCheck, AfterViewChecked {
  @Int childIQ: number;
  private differ: KeyValueDiffer<string, any>;
  private _parent: Human;
  @Int childAge: number;
  @Int childScore: number;
  @Input() ageIncrement = 0;
  @Input() grandparentHairColor: string;
  @Input()
  get value(): Human {
    return this._parent;
  }
  set value(v: Human) {
    this._parent = v;
    this.childAge = v.children[1].age;
    this.childIQ = v.children[1].iq;
    this.childScore = v.children[1].score;
    this.differ = this.differs.find(this.value.parent).create();
  }
  constructor(private differs: KeyValueDiffers, public _cdr: ChangeDetectorRef, public _tcdr: TreeChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewChecked(): void {
    console.log(`EventParentComponent.ngAfterViewChecked (age: ${this.value.age})`);
  }
  ngDoCheck(): void {
    console.log(`EventParentComponent.ngDoCheck (age: ${this.value.age})`);
    // important: example of how a cycle can still occur even with uni-directional data flow:
    // 1. grandparent.component changes hairColor to 'brown'
    // 2. change detection runs
    //    - child.component input property `grandparentHairColor` is set to 'brown'
    //    - child.component.ngOnChanges runs, seeing that `grandparentHairColor === 'brown'`, set's the value to 'brown!';
    //      it schedules another change detection run to allow ancestor templates to reflect change made here
    // 3. change detection runs:
    //    - parent.component.ngDoCheck runs (this method) and set's the value back to 'brown'
    //      it schedules another change detection run to allow ancestor templates to reflect change made here
    // 4. change detection runs
    //    - repeat step 2. causing change detection cycle

    // use (abuse?) `DoCheck` to perform the equivalent of AngularJS `$watch`...
    const changes = this.differ.diff(this.value.parent);
    if (changes) {
      changes.forEachChangedItem(r => {
        if (r.key === '_hairColor' && (r.currentValue === 'brown!')) {
          this.value.parent.hairColor = r.previousValue;
          this._tcdr.markForCheckAsap(this._cdr);
        }
      });
    }
  }
}
