import { Component, OnInit, DoCheck } from '@angular/core';
import { Human } from './model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EventsService } from './events.service';
import { asap } from 'rxjs/scheduler/asap';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/observeOn';

class CustomValidators {
  static isTooOld(group: FormGroup): { [key: string]: boolean } {
    return group.value > 120 ? { tooOld: true } : null;
  }
}

function createFakeData() {
  const gp = new Human({
    age: 90,
    hairColor: 'white',
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
        <label>Hair color: <input type="string" #hair [value]="value.hairColor"/></label>
        <button type="button" (click)="changeHairColor(hair.value)">Change</button>
        <small>Try change to brown</small>
      </p>
      <p>
        Descendants age: {{value.descendantsAge}}
        <button type="button" (click)="incrementDescendantAge()">+</button>
      </p>
      <p>
        Grandchild IQ changes: {{iqChanges$ | async}}
        <button type="button" (click)="evts.requestIQChange()">Request +</button>
      </p>
    </div>
    <app-unidir-parent
      [value]="value.children[0]"
      [ageIncrement]="nextAgeIncrement"
      [grandparentHairColor]="value.hairColor"></app-unidir-parent>
  `,
  styles: [`small { font-size: 65%; color: #777; }`],
  providers: [EventsService]
})
export class GrandparentComponent implements OnInit, DoCheck {
  nextAgeIncrement = 0;
  iqChanges$: Observable<number>;
  form: FormGroup;

  value: Human;
  constructor(private _fb: FormBuilder, public evts: EventsService) {
    this.value = createFakeData();
    this.form = this._fb.group({
      age: ['', [Validators.required, CustomValidators.isTooOld]],
    });
    this.iqChanges$ = evts.iqChanges$;
    // listen to emissions asynchronously as a way of avoiding `ExpressionChangedAfterItHasBeenCheckedError` error:
    // alternatively, my descendant components should not change iq during the digest loop
    // this.iqChanges$ = evts.iqChanges$.observeOn(asap);

  }

  ngDoCheck(): void {
    console.log('GrandparentComponent.ngDoCheck');
  }

  ngOnInit() {
  }

  changeHairColor(color: string) {
    this.value.hairColor = color;
  }

  incrementDescendantAge() {
    ++this.nextAgeIncrement;
  }

  resetProblemAge() {
    if (this.hasAgeError) {
      this.value.age = 100;
    }
  }

  get hasAgeError(): boolean {
    return this.form.get('age').hasError('tooOld');
  }
}
