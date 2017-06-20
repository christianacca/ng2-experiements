import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { Human } from './model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EventsService } from './events.service';
import { Observable } from 'rxjs/Observable';

class CustomValidators {
  static isTooOld(group: FormGroup): { [key: string]: boolean } {
    return group.value > 120 ? { tooOld: true } : null;
  }
}

function createFakeData() {
  const gp = new Human({
    age: 90,
    score: 40,
    children: [
      new Human({
        age: 35,
        score: 50,
        children: [
          new Human({ age: 12, score: 70, }),
          new Human({ age: 5, score: 60, })
        ]
      })
    ]
  });
  for (const p of gp.children) {
    p.parent = gp;
    for (const c of p.children) {
      c.parent = p;
    }
  }
  return gp;
}

@Component({
  template: `
    <div>
      <h3>Grand parent (age: {{value.age}}<span *ngIf="hasAgeError">!</span>)</h3>
      <form [formGroup]="form">
        <label>Age: <input type="number" formControlName="age" [(ngModel)]="value.age" (blur)="resetProblemAge()"/></label>
      </form>
      <p>
        Descendants age: {{value.descendantsAge}}
        <button type="button" (click)="incrementDescendantAge()">+</button>
      </p>
      <p>
        Grandchild IQ changes: {{iqChanges$ | async}}
      </p>
    </div>
    <app-event-parent [value]="value.children[0]" [ageIncrement]="nextAgeIncrement"></app-event-parent>
  `,
  styles: [],
  providers: [EventsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventGrandparentComponent implements OnInit, DoCheck {
  nextAgeIncrement = 0;
  iqChanges$: Observable<number>;
  form: FormGroup;

  value: Human;
  constructor(private _fb: FormBuilder, evts: EventsService, private cdr: ChangeDetectorRef) {
    this.value = createFakeData();
    this.form = this._fb.group({
      age: ['', [Validators.required, CustomValidators.isTooOld]],
    });
    this.iqChanges$ = evts.iqChanges$;
  }

  ngOnInit() {
  }
  ngDoCheck(): void {
    const age = this.value.age;
    console.log(`EventGrandparentComponent.ngDoCheck (age: ${age}`);
  }
  incrementDescendantAge() {
    ++this.nextAgeIncrement;
  }

  resetProblemAge() {
    if (this.value.age > 120) {
      this.value.age = 100;
      // trigger anther pass of the change detector sweep
      // This is workaround to `[(ngModel)]="value.age"` binding "running late" ie running
      // during the change detection cycle triggered by the `(blur)="resetProblemAge()"`
      // At this point *ngIf="hasAgeError" has already been checked for changes and will not
      // run even though the `this.form.age` model has now changed it's validation status.
      // To ensure our template is updated, we therefore need to schedule angular to check for changes
      // when the callback to `setTimeout` runs. At that point the `*ngIf="hasAgeError"` will "see"
      // the change to the form's validaty
      setTimeout(() => this.cdr.markForCheck(), 0);
    }
  }
  get hasAgeError(): boolean {
    return this.form.get('age').hasError('tooOld');
  }
}

