import { Component, Inject } from '@angular/core';
import { Bootstrapped2Service } from './bootstrapping-egs/bootstrapped2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(bootstrapped2: Bootstrapped2Service) {
    console.log('AppComponent created');
    console.log(`${bootstrapped2.asyncValue}`);
  }
}
