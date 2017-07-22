import { Component, OnInit, Input, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { Human } from './model';

@Component({
  selector: 'app-unidir-parent',
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
        <button type="button" (click)="changeChildAge(age.value)">Change</button>
    </p>
    <p>
        <label>Child 2 IQ: <input type="number" #iq [value]="childIQ"/></label>
        <button type="button" (click)="changeChildIQ(iq.value)">Change</button>
    </p>
    <p>
        <label>Child 2 Score: <input type="number" #score [value]="childScore"/></label>
        <button type="button" (click)="changeChildScore(score.value)">Change</button>
        <span *ngIf="value.children[1].score > value.children[0].score">(Highest)</span>
    </p>
    <app-unidir-child [value]="value.children[0]"
      [ageIncrement]="ageIncrement"
      [grandparentHairColor]="grandparentHairColor"></app-unidir-child>
    <app-unidir-child [value]="value.children[1]" [age]="childAge" [iq]="childIQ" [score]="childScore"></app-unidir-child>
  `,
  styles: [`
    :host { display: block; padding-left: 20px;}
  `]
})
export class ParentComponent implements OnInit, DoCheck {
  childIQ: number;
  private differ: KeyValueDiffer<string, any>;
  private _parent: Human;
  childAge: number;
  childScore: number;
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
  constructor(private differs: KeyValueDiffers) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    console.log(`ParentComponent.ngDoCheck (age: ${this.value.age})`);
    // (uni-directional data flow - means an update to data cannot be made that would affect a component,
    //  higher in the component tree, that has already been checked for changes and it's view updated during
    //  the current change detection cycle):

    // important: example of how a cycle can still occur even with uni-directional data flow:
    // 1. grandparent.component changes hairColor to 'brown'
    // 2. change detection runs
    //    - child.component input property `grandparentHairColor` is set to 'brown'
    //    - child.component.ngOnChanges runs, seeing that `grandparentHairColor === 'brown'`, set's the value to 'brown!';
    //      it does this within a timeout to avoid `ExpressionChangedAfterItHasBeenCheckedError` error
    // 3. timeout fires and runs the code to assign the `hairColor` to 'brown!'
    // 4. change detection runs:
    //    - parent.component.ngDoCheck runs (this method) and set's the value back to 'brown'
    //      it does this within a timeout to avoid `ExpressionChangedAfterItHasBeenCheckedError` error
    // 5. timeout fires and runs the code to assign the `hairColor` back to 'brown'
    // 6. change detection runs
    //    - repeat step 2. causing change detection cycle

    // use (abuse?) `DoCheck` to perform the equivalent of AngularJS `$watch`...
    if (this.value.parent.isMiddleAge) {
      this.value.parent.test.name = 'kc';
    }
    const changes = this.differ.diff(this.value.parent);
    if (changes) {
      changes.forEachChangedItem(r => {
        if (r.key === 'hairColor' && (r.currentValue === 'brown!')) {
          // to avoid `ExpressionChangedAfterItHasBeenCheckedError` error we must move the update model
          // outside of the current change detection cycle
          setTimeout(() => {
            this.value.parent.hairColor = r.previousValue;
          }, 1000);
        }
      });
    }
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
