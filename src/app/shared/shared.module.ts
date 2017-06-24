import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedIfDirective } from './attached-if.directive';
import { RxContextDirective } from './rx-context.directive';
import { PausePipe } from './pause.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AttachedIfDirective, RxContextDirective, PausePipe],
  exports: [AttachedIfDirective, RxContextDirective, PausePipe]
})
export class SharedModule { }
