import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

/**
 * Example of combining template-driven forms with reactive code ie using
 * the valueChanges EventEmitter (an rxjs Subject) to allow code to reactive
 * to the form changes over time
 */

@Component({
  selector: 'app-form-hybrid',
  templateUrl: './form-hybrid.component.html',
  styleUrls: ['./form-hybrid.component.css']
})
export class FormHybridComponent implements OnInit, AfterViewInit {
  @ViewChild('myForm') currentForm: NgForm;
  formValue$: Observable<any>;

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    this.formValue$ = this.currentForm.valueChanges.map(stringify).do(console.log);
  }
}

function stringify(value: any): string {
  return JSON.stringify(value);
}