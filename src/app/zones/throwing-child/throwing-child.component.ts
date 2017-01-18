import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-throwing-child',
  templateUrl: './throwing-child.component.html',
  styleUrls: ['./throwing-child.component.css']
})
export class ThrowingChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  throwError() {
    throw new Error('BANG!');
  }

}
