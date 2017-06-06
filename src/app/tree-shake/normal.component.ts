import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normal',
  template: `
    <p>
      normal Works!
    </p>
  `,
  styles: []
})
export class NormalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
