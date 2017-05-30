import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedIfDirective } from './attached-if.directive';
import { RxContextDirective } from './rx-context.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AttachedIfDirective, RxContextDirective],
  exports: [AttachedIfDirective, RxContextDirective]
})
export class SharedModule { }
