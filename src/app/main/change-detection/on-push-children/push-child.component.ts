import { Component, OnInit, Input, DoCheck, AfterViewChecked, SimpleChanges, OnChanges } from '@angular/core';
import { ChildModel } from './child-model';

@Component({
  selector: 'app-push-child',
  template: `
    <p>
      Child age: {{age}}
    </p>
    <p>
      Child name: {{model.name}}
      <button type="button" (click)="schedule()">Schedule rename</button>
      <button type="button" (click)="rename()">Rename</button>
    </p>
    <app-push-grandchild [model]="childModel"></app-push-grandchild>
  `,
  styles: [
    `:host { display: block; padding-left: 20px } `
  ]
})
export class PushChildComponent implements OnInit, DoCheck, AfterViewChecked, OnChanges {
  @Input() age: number;
  @Input() model: ChildModel = { name: '' };
  @Input() childModel: ChildModel = { name: '' };
  constructor() { }

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

  ngAfterViewChecked(): void {
    console.log('PushChildComponent.ngAfterViewChecked');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PushChildComponent.ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('PushChildComponent.ngDoCheck');
  }
}
