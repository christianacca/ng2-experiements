import { Component, Inject } from '@angular/core';
import { Bootstrappable } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(bootstrappable: Bootstrappable) {
    console.log('AppComponent created');
    console.log(`${bootstrappable.value}`);
  }
}
