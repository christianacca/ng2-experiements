import { Component } from '@angular/core';

@Component({
  selector: 'app-proj-container',
  template: `
    <div class="container" [ngClass]="{
      in: this.isActive,
      out: !this.isActive
    }">
      <ng-content *ngIf="isActive"></ng-content>
    </div>
    <button (click)="reset()" [disabled]="!isActive">Reset</button>
  `,
  styleUrls: ['./proj-container.component.css']
})
export class ProjContainerComponent {
  isActive = true;
  constructor() { }

  reset() {
    this.isActive = false;
    setTimeout(() => {
      this.isActive = true;
    }, 2000);
  }
}
