import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-throwing-child',
  template: `<button (click)="throwError()">Throw</button>`
})
export class ThrowingChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  throwError() {
    throw new Error('BANG!');
  }

}
