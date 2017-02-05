import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent {

  constructor() { }

  throwError() {
    throw new Error('BANG');
  }

}
