import { Component, OnInit } from '@angular/core';
import { Service5Service } from '../services';

@Component({
  selector: 'app-di-sub3',
  templateUrl: './di-sub3.component.html',
  styleUrls: ['./di-sub3.component.css']
})
export class DiSub3Component implements OnInit {

  constructor(public svc5: Service5Service) { }

  ngOnInit() {
  }

}
