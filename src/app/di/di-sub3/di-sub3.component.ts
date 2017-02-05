import { Component, OnInit, Optional } from '@angular/core';

import { DiDir1Directive } from './../di-dir1.directive';
import { DiDir5Directive } from './../di-dir5.directive';
import { DiDirTmplContainerDirective } from './../di-dir-tmpl-container.directive';
import { DiTmplContainer2Component } from './../di-tmpl-container2/di-tmpl-container2.component';
import { DiTmplContainerComponent } from './../di-tmpl-container/di-tmpl-container.component';
import { Service5Service } from '../services';
import { Service6Service } from './../services/service6.service';

@Component({
  selector: 'app-di-sub3',
  templateUrl: './di-sub3.component.html',
  styleUrls: ['./di-sub3.component.css']
})
export class DiSub3Component implements OnInit {

  constructor(
    public svc5: Service5Service,
    @Optional() public svc6: Service6Service,
    @Optional() public dirTmplContainer: DiDirTmplContainerDirective,
    @Optional() public tmplContainer: DiTmplContainerComponent,
    @Optional() public tmplContainer2: DiTmplContainer2Component,
    @Optional() public dir1: DiDir1Directive,
    @Optional() public dir5: DiDir5Directive) { }

  ngOnInit() {
  }

}
