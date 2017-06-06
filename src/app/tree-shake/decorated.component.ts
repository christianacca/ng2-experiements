import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../core';

@Component({
  selector: 'app-decorated',
  template: `
    <p>
      decorated Works!
    </p>
  `,
  styles: []
})
@AutoUnsubscribe
export class DecoratedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
