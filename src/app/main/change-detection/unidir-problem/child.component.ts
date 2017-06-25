import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';
import { Human } from './model';
import { EventsService } from './events.service';
import { Subscription } from 'rxjs/Subscription';

interface Inputs extends SimpleChanges {
  age?: SimpleChange;
  iq?: SimpleChange;
  score?: SimpleChange;
  grandparentHairColor?: SimpleChange;
}

@Component({
  selector: 'app-unidir-child',
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
  `]
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {
  @Input() grandparentHairColor: string;
  iqChangeRequested: boolean;
  iqRequestSub: Subscription;
  @Input() set ageIncrement(value: number) {
    if (this.value == null) { return; }

    this.value.age += value;
  }
  @Input() value: Human;
  @Input() iq: string;
  @Input() age: string;

  @Input() score: string;
  constructor(private evts: EventsService) {
    this.iqRequestSub = evts.iqChangeRequests$.subscribe(() => {
      // this is a contrived example - normally we would update the iq on the model here
      // rather than deferring this until the `DoCheck` lifecycle event is received
      this.iqChangeRequested = true;
    });

    // // example of how a cycle can still occur even with uni-directional data flow:
    // evts.hairColorChange$.subscribe(({ color, subject }) => {
    //   if (this.value.parent.parent === subject && color === 'brown') {
    //     // to avoid a stackoverflow we need to defer till the next event loop
    //     setTimeout(() => { this.changeGrandparentHairColor(color + '!') }, 1000);
    //   }
    // });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: Inputs): void {
    if (changes.age && !changes.age.isFirstChange()) {
      this.value.age = parseInt(this.age, 10);
    }
    if (changes.iq && !changes.iq.isFirstChange()) {
      this.value.iq = parseInt(this.iq, 10);
      this.evts.notifyIQChange();
    }
    if (changes.score && !changes.score.isFirstChange()) {
      this.value.score = parseInt(this.score, 10);
    }
    if (changes.grandparentHairColor && changes.grandparentHairColor.currentValue === 'brown') {
      // important: this is part of a change detection infinite loop - see comments in parent.component
      // to avoid `ExpressionChangedAfterItHasBeenCheckedError` error we must move the update model
      // outside of the current change detection cycle
      setTimeout(() => {
        this.value.parent.parent.hairColor = changes.grandparentHairColor.currentValue + '!';
      }, 1000);
    }
  }

  ngDoCheck(): void {
    console.log('ChildComponent.ngDoCheck');
    // note: this is a clearly a contrived example - it's unlikely that we would use
    // `ngDoCheck` hook to make a change to the iq property of our model
    // instead we would make the change to the model in the function subscribed to receive evts.iqChangeRequests$ events
    // this code is just to demonstrate when `_tcdr.markForCheckAsap` has to be called imperatively rather than being able
    // to use `onChangesMarkForCheck` to handle this for us
    if (this.iqChangeRequested) {
      this.iqChangeRequested = false;
      this.changeIQ(this.value.iq + 1);
      // to avoid `ExpressionChangedAfterItHasBeenCheckedError` error we must move the update of iq
      // outside of the current change detection cycle as per commented out line below
      // setTimeout(() => { this.changeIQ(this.value.iq + 1); }, 0);
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
