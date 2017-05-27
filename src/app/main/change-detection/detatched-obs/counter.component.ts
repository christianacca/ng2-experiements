import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-counter',
  template: `
    <p>
      {{value | async}}
    </p>
  `,
  styles: []
})
export class CounterComponent implements OnInit {
  @Input() value: Observable<number>;
  @Input()
  get updateView() {
    return this._isViewUpdating;
  }
  set updateView(value: boolean) {
    this._isViewUpdating = value;
    if (value) {
      this.cd.reattach();
    } else {
      this.cd.detach();
    }
  }

  private _isViewUpdating = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.cd.detach();
    this.updateView = true;
  }
}
