import { Component, OnInit } from '@angular/core';
import { Service3Service, Service5Service } from './services';

@Component({
  selector: 'app-di',
  templateUrl: './di.component.html',
  styleUrls: ['./di.component.css'],
  providers: [Service3Service, Service5Service]
})
export class DiComponent implements OnInit {

  constructor(public svc3: Service3Service, private svc5: Service5Service) { 
    this.svc5.providedBy = 'app-di'
  }

  ngOnInit() {
  }

}
