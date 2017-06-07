import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Human } from './model';
import { EventsService } from './events.service';

interface Inputs extends SimpleChanges {
  age?: SimpleChange;
  iq?: SimpleChange;
  score?: SimpleChange;
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
export class ChildComponent implements OnInit, OnChanges {

  @Input() value: Human;
  @Input() iq: string;
  @Input() age: string;

  @Input() score: string;
  constructor(private evts: EventsService) { }

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
