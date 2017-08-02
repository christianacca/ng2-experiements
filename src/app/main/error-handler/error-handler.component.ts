import { Component, OnInit } from '@angular/core';
import { delay } from '../../promise-exts';

@Component({
  selector: 'app-error-handler',
  template: `
    <h3>Error handler service examples</h3>

    <button (click)="throwError()">Throw (sync)</button>
    <button (click)="throwAsync()">Throw (async)</button>
    <button (click)="throwOnceAsync()">Throw once (async)</button>
  `
})
export class ErrorHandlerComponent {
  private done: Promise<void>;

  constructor() { }

  throwError() {
    throw new Error('BANG');
  }

  async throwAsync() {
    await delay(1000);
    throw new Error('throwAsync threw');
  }

  throwOnceAsync() {
    // this is nasty! there is a race condition that will determine
    // whether the error is swallowed or sent to `ErrorHandler`
    // * user clicks button that calls me
    // * if the user does NOT click button again before the period of
    //   delay is up then the error 'throwOnceAsync threw' will be sent
    //   to global `ErrorHandler` (as expected)
    // * if the user DOES click button again before the period of
    //   delay is up then the error 'throwOnceAsync threw' will be sent
    //   swallowed :-0

    if (this.done) {
      return this.done.catch(error => {
        console.log('error swallowed');
      });
    }
    this.done = delay(3000).then(() => {
      throw new Error('throwOnceAsync threw');
    });
    return this.done;
  }
}
