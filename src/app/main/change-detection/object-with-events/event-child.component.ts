import {
  Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ChangeDetectionStrategy,
  DoCheck, ChangeDetectorRef, AfterViewChecked
} from '@angular/core';
import { Human } from './model';
import { EventsService } from './events.service';
import {
  TreeChangeDetectorRef, CanMarkForCheckAsap, Int, OnChangesMarkForCheck, MarkForCheckEnabled, AutoUnsubscribe
} from '../../../core';
import { Subscription } from 'rxjs/Subscription';

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
@OnChangesMarkForCheck
@AutoUnsubscribe
export class EventChildComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked, CanMarkForCheckAsap {
  iqRequestSub: Subscription;
  iqChangeRequested: boolean;
  @Input()
  set ageIncrement(value: number) {
    if (this.value == null) { return; }

    this.value.age += value;
  }
  @Input()
  @MarkForCheckEnabled(false)
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
  @Input() @Int iq: number;
  @Input() @Int age: number;
  @Input() @Int score: number;

  private _value: Human;

  constructor(private evts: EventsService, public _cdr: ChangeDetectorRef, public _tcdr: TreeChangeDetectorRef) {
    this.iqRequestSub = evts.iqChangeRequests$.subscribe(() => {
      // this is a contrived example - normally we would update the iq on the model here
      // rather than deferring this until the `DoCheck` lifecycle event is received
      this.iqChangeRequested = true;
      this._cdr.markForCheck();
    });
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    console.log(`EventChildComponent.ngAfterViewChecked (age: ${this.value.age})`);
  }

  ngOnChanges(changes: Inputs): void {
    console.log('EventChildComponent.ngOnChanges');
    if (changes.age && !changes.age.isFirstChange()) {
      this.value.age = this.age;
      if (this.value.isMiddleAge) {
        this.value.score += 20;
      }
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
    console.log(`EventChildComponent.ngDoCheck (age: ${this.value.age})`);
    // note: this is a clearly a contrived example - it's unlikely that we would use
    // `ngDoCheck` hook to make a change to the iq property of our model
    // instead we would make the change to the model in the function subscribed to receive evts.iqChangeRequests$ events
    // this code is just to demonstrate when `_tcdr.markForCheckAsap` has to be called imperatively rather than being able
    // to use `onChangesMarkForCheck` to handle this for us
    if (this.iqChangeRequested) {
      this.iqChangeRequested = false;
      this.changeIQ(this.value.iq + 1);
      // trigger anther pass of the change detector sweep
      // we do this because our ancestor has already been marked as checked and therefore model updates it might
      // have made when listening to `iqChanges$` will not be reflected in the DOM
      this._tcdr.markForCheckAsap(this._cdr);
    }
  }

  changeAge(value: string) {
    this.value.age = parseInt(value, 10);
  }
  changeIQ(value: string | number) {
    const iq = typeof value === 'string' ? parseInt(value, 10) : value;
    this.value.iq = iq;
    this.evts.notifyIQChange();
  }
  changeScore(value: string) {
    this.value.score = parseInt(value, 10);
  }
}
