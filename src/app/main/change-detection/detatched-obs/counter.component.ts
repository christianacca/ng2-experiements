import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
export class CounterComponent implements OnInit, OnDestroy {
  valueSubscription: Subscription;
  updateViewSubscription: Subscription;

  @Input() value: Observable<number>;
  @Input() updateView: Observable<boolean>;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this.updateViewSubscription.unsubscribe();
  }

  ngOnInit() {
    this.cd.detach();
    this.updateViewSubscription = this.updateView.subscribe(on => {
      if (on) {
        this.cd.reattach();
      } else {
        this.cd.detach();
      }
    });
  }

}
