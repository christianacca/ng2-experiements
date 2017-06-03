import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Parent } from './model';
import { EventsService } from './events.service';

interface Inputs extends SimpleChanges {
  age?: SimpleChange;
  iq?: SimpleChange;
}

@Component({
  selector: 'app-unidir-child',
  template: `
    <div>
      <h3>Child (age: {{value.age}})</h3>
      <p>
        <label>Age: <input type="number" #age [value]="value.age"/></label>
        <button type="button" (click)="changeAge(age.value)">Change</button>
      </p>
      <p>
        <label>IQ: <input type="number" #iq [value]="value.iq"/></label>
        <button type="button" (click)="changeIQ(iq.value)">Change</button>
      </p>
    </div>
  `,
  styles: []
})
export class ChildComponent implements OnInit, OnChanges {

  @Input() value: Parent;
  @Input() iq: string;
  @Input() age: string;
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
    // this.evts.notifyBirthday();
  }

  changeAge(value: string) {
    this.value.age = parseInt(value, 10);
  }
  changeIQ(value: string) {
    this.value.iq = parseInt(value, 10);
    this.evts.notifyIQChange();
  }

}
