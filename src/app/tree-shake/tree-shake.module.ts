import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalComponent } from './normal.component';
import { DecoratedComponent } from './decorated.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NormalComponent, DecoratedComponent],
  exports: [DecoratedComponent, NormalComponent]
})
export class TreeShakeModule { }
