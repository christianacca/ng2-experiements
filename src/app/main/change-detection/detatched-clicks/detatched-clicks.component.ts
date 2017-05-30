import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detatched-clicks',
  templateUrl: './detatched-clicks.component.html',
  styles: []
})
export class DetatchedClicksComponent implements OnInit {
  isChildAttached = true;
  constructor() { }

  ngOnInit() {
  }

}
