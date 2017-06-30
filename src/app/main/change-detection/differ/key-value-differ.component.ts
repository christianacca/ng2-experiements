import { Component, OnInit, DoCheck } from '@angular/core';
import { Model, ModelClass } from './model';

@Component({
  selector: 'app-key-value-differ',
  templateUrl: './key-value-differ.component.html',
  styles: []
})
export class KeyValueDifferComponent implements OnInit, DoCheck {
  literal: Model;
  instance: Model;
  constructor() {
    this.literal = {
      age: 25,
      child: {},
      firstName: 'c',
      lastName: 'crow',
      get name(this: Model) {
        return `${this.firstName} ${this.lastName}`;
      }
    };
    this.instance = new ModelClass();
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    console.log('KeyValueDifferComponent.ngDoCheck')

  }
}
