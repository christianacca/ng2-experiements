import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAttachedIf]'
})
export class AttachedIfDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('appAttachedIf') isAttached: boolean;
  @HostBinding() get hidden() {
    return !this.isAttached;
  };
  constructor() { }

}
