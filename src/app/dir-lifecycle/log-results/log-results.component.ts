import { Component, OnInit } from '@angular/core';

import { LoggerService } from './../logger.service';

@Component({
  selector: 'app-log-results',
  template: `
  <h4>Logs</h4>
  <ul>
    <li *ngFor="let msg of logger.logs">{{msg}}</li>
  </ul>
  `,
  styles: [`:host { display: block }`]
})
export class LogResultsComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
  }

}
