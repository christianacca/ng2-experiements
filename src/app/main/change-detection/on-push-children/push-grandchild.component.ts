import { Component, OnInit, Input, ChangeDetectorRef, DoCheck, AfterViewChecked, SimpleChanges, OnChanges } from '@angular/core';
import { ChildModel } from './child-model';
import { PushParentComponent } from './push-parent.component';
import { Subscription } from 'rxjs/Subscription';
import { AutoUnsubscribe } from '../../../core';

@Component({
  selector: 'app-push-grandchild',
  template: `
    <p>
      Child name: {{model.name}}
      <button type="button" (click)="schedule()">Schedule rename</button>
      <button type="button" (click)="scheduleMarkForCheck()">... with markForCheck</button>
      <button type="button" (click)="rename()">Rename</button>
    </p>
  `,
  styles: [
    `:host { display: block; padding-left: 20px } `
  ]
})
@AutoUnsubscribe
export class PushGrandchildComponent implements OnInit, DoCheck, AfterViewChecked, OnChanges {
  nameSuffixSub: Subscription;
  @Input() model: ChildModel = { name: '' };
  constructor(ancestor: PushParentComponent, private cdr: ChangeDetectorRef) {
    this.nameSuffixSub = ancestor.nameSuffix$.subscribe(suffix => {
      this.model.name += suffix;
    });
  }

  ngOnInit() {
  }

  rename() {
    this.model.name = 'renamed';
  }

  schedule() {
    setTimeout(() => {
      this.model.name = 'scheduled';
    }, 100)
  }

  scheduleMarkForCheck() {
    setTimeout(() => {
      this.model.name = 'checked';
      this.cdr.markForCheck();
    }, 100)
  }


  ngAfterViewChecked(): void {
    console.log('PushGrandchildComponent.ngAfterViewChecked');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PushChildComponent.ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('PushGrandchildComponent.ngDoCheck');
  }
}
