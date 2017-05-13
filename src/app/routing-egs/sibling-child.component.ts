import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLevelService } from './component-level.service';

@Component({
  selector: 'app-sibling-child',
  template: `
    <p>
      sibling-child Works ({{ localState }})!
    </p>
  `,
  styles: []
})
export class SiblingChildComponent implements OnInit {
  localState: number;

  constructor(private currentRoute: ActivatedRoute, public compLvlService: ComponentLevelService) {
    this.localState = Math.ceil(Math.random() * 10);
    console.group('SiblingChildComponent.ctor');
    console.log('ComponentLevelService:', compLvlService.routerState.root.snapshot);
    console.log('SiblingChildComponent:', currentRoute.snapshot);
    console.groupEnd();
  }

  ngOnInit() {
  }

}
