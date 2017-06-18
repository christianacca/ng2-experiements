import {
  Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ChangeDetectionStrategy,
  DoCheck, ChangeDetectorRef
} from '@angular/core';
import { Human } from './model';
import { EventsService } from './events.service';
import {
  TreeChangeDetectorRef, CanMarkForCheckAsap, int, onChangesMarkForCheck, markForCheckEnabled
} from '../../../core';

interface Inputs extends SimpleChanges {
  age?: SimpleChange;
  iq?: SimpleChange;
}

@Component({
  selector: 'app-event-child',
  template: `
    <div>
      <h3>Child (age: {{value.age}})
        <small *ngIf="value.siblings[0].score > value.score">(intelligent sibling: {{value.siblings[0].score}})</small>
      </h3>
      <p>
        <label>Age: <input type="number" #age [value]="value.age"/></label>
        <button type="button" (click)="changeAge(age.value)">Change</button>
      </p>
      <p>
        <label>IQ: <input type="number" #iq [value]="value.iq"/></label>
        <button type="button" (click)="changeIQ(iq.value)">Change</button>
      </p>
      <p>
        <label>Score: <input type="number" #score [value]="value.score"/></label>
        <button type="button" (click)="changeScore(score.value)">Change</button>
      </p>
    </div>
  `,
  styles: [`
    :host { display: block; padding-left: 20px }
    small { font-size: 65%; color: #777; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@onChangesMarkForCheck
export class EventChildComponent implements OnInit, OnChanges, DoCheck, CanMarkForCheckAsap {
  @Input()
  set ageIncrement(value: number) {
    if (this.value == null) { return; }

    this.value.age += value;
  }
  @Input()
  @markForCheckEnabled(false)
  get value() {
    return this._value;
  }
  set value(v: Human) {
    // todo: unsubscribe to existing _value
    this._value = v;
    this._value.parent.parent.propertyChanged.subscribe(_ => {
      this._cdr.markForCheck();
    });
  };
  @Input() @int iq: number;
  @Input() @int age: number;
  @Input() @int score: number;

  private _value: Human;

  constructor(private evts: EventsService, public _cdr: ChangeDetectorRef, public _tcdr: TreeChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(changes: Inputs): void {
    console.log('EventChildComponent.ngOnChanges');
    if (changes.age && !changes.age.isFirstChange()) {
      this.value.age = this.age;
    }
    if (changes.iq && !changes.iq.isFirstChange()) {
      this.value.iq = this.iq;
      this.evts.notifyIQChange();
    }
    if (changes.score && !changes.score.isFirstChange()) {
      this.value.score = this.score;
    }
  }
  ngDoCheck(): void {
    console.log('EventChildComponent.ngDoCheck');
  }

  changeAge(value: string) {
    this.value.age = parseInt(value, 10);
  }
  changeIQ(value: string) {
    this.value.iq = parseInt(value, 10);
    this.evts.notifyIQChange();
  }
  changeScore(value: string) {
    this.value.score = parseInt(value, 10);
  }
}
