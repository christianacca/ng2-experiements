import { Component, OnInit } from '@angular/core';

import { LoggerService } from './logger.service';

@Component({
  selector: 'app-dir-lifecycle',
  templateUrl: './dir-lifecycle.component.html',
  providers: [LoggerService]
})
export class DirLifecycleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
