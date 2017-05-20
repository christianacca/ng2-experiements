import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="row">
      <app-asset-list class="col"></app-asset-list>
      <app-asset-list class="col"></app-asset-list>
    </div>
  `,
  styles: [`
    .row { width: 100%; clear: both }
    .col {width: 50%; float: left; }
  `],
  providers: []
})
export class DiReg2Component {}
