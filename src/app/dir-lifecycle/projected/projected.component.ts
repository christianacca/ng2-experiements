import { Component, OnDestroy } from '@angular/core';

import { LoggerService } from './../logger.service';

@Component({
  selector: 'app-projected',
  templateUrl: './projected.component.html',
  styles: [`
    :host { display: block }
  `]
})
export class ProjectedComponent implements OnDestroy {

  constructor(private logger: LoggerService) {
    this.logger.log('ProjectedComponent created');
  }

  ngOnDestroy() {
    this.logger.log('ProjectedComponent destroyed');
  }

}
