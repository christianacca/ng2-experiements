import { Component, OnInit } from '@angular/core';
import { ComponentLevelService } from './component-level.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child-route1',
  template: `
    <p>
      child-route1 Works!
    </p>
    <p>
      {{ compLvlService.value }}
    </p>
    <p>
      localState: {{ localState }}
    </p>
    <p>
      <a routerLink="/routing-eg">Back to 'Routing experiments'</a>
    </p>
  `,
  styles: []
})
export class ChildRoute1Component implements OnInit {
  localState: number;
  constructor(private currentRoute: ActivatedRoute, public compLvlService: ComponentLevelService) {
    this.localState = Math.ceil(Math.random() * 10);
    console.group('ChildRoute1Component.ctor');
    console.log('ComponentLevelService:', compLvlService.routerState.root.snapshot);
    console.log('ChildRoute1Component:', currentRoute.snapshot);
    console.groupEnd();
  }

  ngOnInit() {
  }

}
