import { Component, Inject } from '@angular/core';
import { Bootstrappable1 } from './core';
import { BootstrappedService } from './runnable-egs/bootstrapped.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(bootstrappable1: Bootstrappable1, bootstrapped: BootstrappedService) {
    console.log('AppComponent created');
    console.log(`${bootstrappable1.asyncValue}`);
    console.log(`${bootstrapped.asyncValue}`);
  }
}
