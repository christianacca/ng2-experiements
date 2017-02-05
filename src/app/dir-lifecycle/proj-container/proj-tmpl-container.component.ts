import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-proj-tmpl-container',
  template: `
    <div class="container" [ngClass]="{
      in: this.isActive,
      out: !this.isActive
    }">
      <ng-container *ngIf="isActive"
        [ngTemplateOutlet]="template">
      </ng-container>
    </div>
    <button (click)="reset()" [disabled]="!isActive">Reset</button>
  `,
  styleUrls: ['./proj-container.component.css']
})
export class ProjTmplContainerComponent{
  isActive = true;
  @Input() template: TemplateRef<any>;
  constructor() { }

  reset() {
    this.isActive = false;
    setTimeout(() => {
      this.isActive = true;
    }, 2000)
  }
}
