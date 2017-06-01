import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Parent } from './model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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
      <form [formGroup]="form">
        <input type="number" formControlName="age" [(ngModel)]="value.age" (blur)="resetProblemAge()"/>
      </form>
    </div>
    <app-event-parent [value]="value.children[0]"></app-event-parent>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventGrandparentComponent implements OnInit {
  form: FormGroup;

  value: Parent;
  constructor(private _fb: FormBuilder, private cdr: ChangeDetectorRef) {
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
    this.value.propertyChanged.subscribe(evt => this.cdr.detectChanges());

    this.form = this._fb.group({
      age: ['', Validators.required],
    },
      {
        validator: CustomValidators.isTooOld(() => this.value)
      });
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

