import { Component, OnInit } from '@angular/core';
import { Parent } from './model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EventsService } from './events.service';
import { asap } from 'rxjs/scheduler/asap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/observeOn';

class CustomValidators {
  static isTooOld(getModelFn: () => Parent): (group: AbstractControl) => { [key: string]: boolean } {
    const model = getModelFn();
    return (group: FormGroup) => {
      if (model.age > 120) {
        return { tooOld: true };
      }
    };
  }
}

@Component({
  template: `
    <div>
      <h3>Grand parent (age: {{value.age}}<span *ngIf="hasAgeError()">!</span>)</h3>
      <p>
        Descendants age: {{value.descendantsAge}}
      </p>
      <p>
        Grandchild IQ changes: {{iqChanges$ | async}}
      </p>
      <form [formGroup]="form">
        <label>Age: <input type="number" formControlName="age" [(ngModel)]="value.age" (blur)="resetProblemAge()"/></label>
      </form>
    </div>
    <app-unidir-parent [value]="value.children[0]"></app-unidir-parent>
  `,
  styles: [],
  providers: [EventsService]
})
export class GrandparentComponent implements OnInit {
  iqChanges$: Observable<number>;
  form: FormGroup;

  value: Parent;
  constructor(private _fb: FormBuilder, evts: EventsService) {
    this.value = new Parent({
      age: 90,
      children: [
        new Parent({
          age: 35,
          children: [
            new Parent({ age: 12 })
          ]
        })
      ]
    });
    this.form = this._fb.group({
      age: ['', Validators.required],
    },
      {
        validator: CustomValidators.isTooOld(() => this.value)
      });
    this.iqChanges$ = evts.iqChanges$;
    // listen to emissions asynchronously as a way of avoiding `ExpressionChangedAfterItHasBeenCheckedError` error:
    // this.iqChanges$ = evts.iqChanges$.observeOn(asap);
  }

  ngOnInit() {
  }

  resetProblemAge() {
    if (this.value.age > 120) {
      this.value.age = 100;
    }
  }

  hasAgeError(): boolean {
    return this.form.hasError('tooOld');
  }

}
