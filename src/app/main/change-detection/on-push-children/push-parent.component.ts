import { Component, OnInit, ChangeDetectionStrategy, DoCheck, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ChildModel } from './child-model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  template: `
    <h3>CheckAlways children of an OnPush parent</h3>
    <div class="inline">
      {{name}}
      <button type="button" (click)="rename()">Change</button>
      <button type="button" (click)="schedule()">Schedule rename</button>
    </div>
    <div>
      <button type="button" (click)="childAge = childAge+1;">+ Child Age</button>
      <button type="button" (click)="incrementGrandchildName()">+ Grand Child Name</button>
    </div>
    <div class="inline">
      <input type="text" placeholder="Child name" #childname /> 
      <button type="button" (click)="childModel.name = childname.value">Change</button>
    </div>
    <div class="inline">
      <input type="text" placeholder="Grand child name" #grandchildname /> 
      <button type="button" (click)="grandChildModel.name = grandchildname.value">Change</button>
    </div>
    <app-push-child [age]="childAge" [model]="childModel" [childModel]="grandChildModel"></app-push-child>
  `,
  styles: [
    ` .inline { display: inline-block }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushParentComponent implements OnInit, DoCheck, AfterViewChecked {
  childAge = 0;
  childModel: ChildModel = { name: 'cc' };
  private nameSuffixSubject = new BehaviorSubject<string>('');
  nameSuffix$ = this.nameSuffixSubject.asObservable();
  grandChildModel: ChildModel = { name: 'hc' };
  name = 'kc';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  incrementGrandchildName() {
    this.nameSuffixSubject.next(this.nameSuffixSubject.value + 1);
  }


  ngAfterViewChecked(): void {
    console.log('PushParentComponent.ngAfterViewChecked');
  }
  ngDoCheck(): void {
    console.log('PushParentComponent.ngDoCheck');
  }

  rename() {
    this.name = 'ab';
  }

  schedule() {
    setTimeout(() => {
      this.name = 'renamed';
      this.cdr.markForCheck();
    }, 200);
  }
}
