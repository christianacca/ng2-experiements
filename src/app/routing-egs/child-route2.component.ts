import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComponentLevelService } from './component-level.service';
import { ChildComponentLevelService } from './child-component-level.service';

interface OptionalParams {
  option1?: boolean;
  option2?: boolean;
}
interface MandatoryParams {
  mandatory1: number;
}
type MyParams = OptionalParams & MandatoryParams;

function parseParams(params: Params) {
  const mandatory: MyParams = {
    mandatory1: parseInt(params['mandatory1'], 10)
  };
  const optional: OptionalParams = {};
  if (params['option1'] != null) {
    optional.option1 = (params['option1'] === 'true' || params['option1'] === true);
  }
  if (params['option2'] != null) {
    optional.option2 = (params['option2'] === 'true' || params['option2'] === true);
  }
  return { mandatory, optional, all: { ...optional, ...mandatory } };
}


@Component({
  selector: 'app-child-route2',
  template: `
    <p>
      child-route2 Works!
    </p>
    <p>
      All params: {{ params | json }}
    </p>
    <p>
      Optional params: {{ optionalParams | json }}
    </p>
    <p>
      Mandatory params: {{ mandatoryParams | json }}
    </p>
    <p>
      localState: {{ localState }}
    </p>
    <p>
      ChildComponentLevelService.value: {{ childLvlService.value }}
    </p>
    <p>
      <input type="text" #input/> {{ input.value }}
    </p>
    <p>
      <a [routerLink]="['../..']">Up one</a>
      <button type="button" (click)="changeOption1(!params.option1)">Change option1</button>
      <button type="button" (click)="changeMandatory1()">Change mandatory1</button>
    </p>
  `,
  providers: [ChildComponentLevelService]
})
export class ChildRoute2Component implements OnInit {
  localState: number;
  optionalParams: OptionalParams;
  mandatoryParams: MandatoryParams;
  params: MyParams;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    compLvlService: ComponentLevelService,
    public childLvlService: ChildComponentLevelService) {
    this.localState = Math.ceil(Math.random() * 10);
    console.group('ChildRoute2Component.ctor');
    console.log('ComponentLevelService:', compLvlService.routerState.root.snapshot);
    console.log('ChildRoute2Component:', currentRoute.snapshot);
    console.groupEnd();
  }

  changeOption1(option1: boolean) {
    const targetParams = { ...this.optionalParams, ...{ option1 } };
    this.router.navigate([targetParams], { relativeTo: this.currentRoute });
  }

  changeMandatory1() {
    this.router.navigate(['..', this.params.mandatory1 + 1, this.optionalParams], { relativeTo: this.currentRoute });
  }

  ngOnInit(): void {
    this.currentRoute.params.map(parseParams).subscribe(params => {
      ({
        optional: this.optionalParams,
        mandatory: this.mandatoryParams,
        all: this.params
      } = params);
    });
  }
}
