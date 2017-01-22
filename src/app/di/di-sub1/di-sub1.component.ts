import { Component, Input, OnInit } from '@angular/core';
import { Service1Service, Service2Service, Service3Service, Service4Service, Service5Service } from '../services';

@Component({
  selector: 'app-di-sub1',
  templateUrl: './di-sub1.component.html',
  styleUrls: ['./di-sub1.component.css'],
  providers: [Service3Service, Service4Service, Service5Service]
})
export class DiSub1Component implements OnInit {
  @Input() svc1Input: Service1Service;
  @Input() svc2Input: Service2Service;
  constructor(
    public svc1: Service1Service, 
    public svc2: Service2Service,
    public svc4: Service4Service,
    private svc5: Service5Service) { 
      this.svc4.providedBy = this.svc5.providedBy = 'app-di-sub1'
    }

  ngOnInit() {
  }

}
