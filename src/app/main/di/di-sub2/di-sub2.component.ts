import { Component, OnInit, Optional } from '@angular/core';
import { Service3Service, Service4Service } from '../services';
import { DiComponent } from '../di.component';

@Component({
  selector: 'app-di-sub2',
  templateUrl: './di-sub2.component.html',
  styleUrls: ['./di-sub2.component.css']
})
export class DiSub2Component implements OnInit {

  constructor(
    public svc3: Service3Service,
    @Optional() public svc4: Service4Service,
    private parent: DiComponent) { }

  ngOnInit() {
  }

  get svc3Provider() {
    return this.svc3 === this.parent.svc3 ? 'app-di' : 'app-di-sub1';
  }

}
