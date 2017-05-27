import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  template: `
    <h3>Error handler service examples</h3>

    <button (click)="throwError()">Throw</button>
  `
})
export class ErrorHandlerComponent {

  constructor() { }

  throwError() {
    throw new Error('BANG');
  }

}
