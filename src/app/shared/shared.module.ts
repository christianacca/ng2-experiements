import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedIfDirective } from './attached-if.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AttachedIfDirective],
  exports: [AttachedIfDirective]
})
export class SharedModule { }
