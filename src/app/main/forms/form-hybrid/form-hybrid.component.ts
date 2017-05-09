import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

/**
 * Example of combining template-driven forms with reactive code ie using
 * the valueChanges EventEmitter (an rxjs Subject) to allow code to react
 * to the form changes over time
 */

@Component({
  selector: 'app-form-hybrid',
  templateUrl: './form-hybrid.component.html',
  styleUrls: ['./form-hybrid.component.css']
})
export class FormHybridComponent implements OnInit, AfterViewChecked {
  @ViewChild('myForm') currentForm: NgForm;
  @ViewChild('age') ageElem: ElementRef;
  @ViewChild('salaryModel') salaryModel: NgModel;
  salary = 20000;
  formValue$: Observable<string>;
  salaryValue$: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.salaryValue$ = this.salaryModel.valueChanges
      .do(v => {
        console.log(`salaryValue$: ${v}`);
      });

    this.formValue$ = this.currentForm.valueChanges
      .map(stringify)
      .map(json => `formValue$: ${json}`)
      .do(console.log);

    this.salaryValue$.subscribe(v => {
      console.log(`ngOnInit salaryValue$ subs: ${v}`);
    });
  }

  ngAfterViewChecked() {
    if (this.ageInput.value) {
      console.log(`ngAfterViewChecked -> ageInput.value: ${this.ageInput.value}`);
    }
    if (this.salaryModel.value) {
      console.log(`ngAfterViewChecked -> salaryModel.value: ${this.salaryModel.value}`);
    }
  }

  setSalary(val: number) {
    this.salary = val;
  }

  get ageInput() {
    return this.ageElem.nativeElement as HTMLInputElement;
  }
}

function stringify(value: any): string {
  return JSON.stringify(value);
}
