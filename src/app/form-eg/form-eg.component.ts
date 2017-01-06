import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-form-eg',
  templateUrl: './form-eg.component.html',
  styleUrls: ['./form-eg.component.css']
})
export class FormEgComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: 'Christian',
      lastName: ['', Validators.required ]
    })
  }

}
