import { Component, OnInit } from '@angular/core';
import { ComponentLevelService } from './component-level.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  template: `
    <h2>
      routing-eg
    </h2>
    <p>
      route params: {{ params | json }}
    </p>
    <nav>
      <ul>
        <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <a routerLink="child-route1">Child route 1</a>
        </li>
        <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <a [routerLink]="['child-route2', '3', { option1: true, option2: false }]">
            Child route 2 (option1 = true; option2 = false)</a>
        </li>
        <li routerLinkActive="active"  [routerLinkActiveOptions]="{exact: true}">
          <a [routerLink]="['child-route2', '3', { option1: false, option2: true }]">
            Child route 2 (option1 = false; option2 = true)</a>
        </li>
        <li routerLinkActive="active"  [routerLinkActiveOptions]="{exact: true}">
          <a [routerLink]="[{ outlets: { aux: ['sibling-child']}}]">
            Show sibling</a>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
    <router-outlet name="aux"></router-outlet>
  `,
  styles: [`
    .active { font-weight: bold }
  `],
  providers: [ComponentLevelService]
})
export class RoutingEgComponent implements OnInit {
  params: Params;
  constructor(currentRoute: ActivatedRoute) {
    console.log('RoutingEgComponent.ctor');
    currentRoute.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
  }

}
