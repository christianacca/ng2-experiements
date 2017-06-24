import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedIfDirective } from './attached-if.directive';
import { RxContextDirective } from './rx-context.directive';
import { PausablePipe } from './pausable.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AttachedIfDirective, RxContextDirective, PausablePipe],
  exports: [AttachedIfDirective, RxContextDirective, PausablePipe]
})
export class SharedModule { }
