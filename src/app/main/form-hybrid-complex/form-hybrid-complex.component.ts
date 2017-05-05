import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Order, OrderLine, getExampleOrder, getExampleOrderLine } from './model';

import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-form-hybrid-complex',
  templateUrl: './form-hybrid-complex.component.html',
  styleUrls: ['./form-hybrid-complex.component.css']
})
export class FormHybridComplexComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;
  formValue$: Observable<any>;
  model: Order;
  logs$: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.model = getExampleOrder();
    this.formValue$ = this.form.valueChanges;
    setTimeout(() => {
      this.logs$ = this.form.control.get('lines').valueChanges
        .map(o => JSON.stringify(o))
        .scan((prev, curr) => prev.concat(curr), []);
    }, 0);
  }
  removeLine(line: OrderLine) {
    const index = this.model.lines.indexOf(line);
    this.model.lines.splice(index, 1);
  }

  addLine() {
    this.model.lines.push(getExampleOrderLine());
  }
}
