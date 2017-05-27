import { Directive, Input, HostBinding, ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appAttachedIf]'
})
export class AttachedIfDirective {
  cd: ChangeDetectorRef;
  private _isAttached = false;
  // tslint:disable-next-line:no-input-rename
  @Input('appAttachedIf')
  get isAttached() {
    return this._isAttached;
  }
  set isAttached(value: boolean) {
    if (value) {
      this.cd.reattach();
    } else {
      this.cd.detach();
    }
    this._isAttached = value;
  }

  // @HostBinding() get hidden() {
  //   return !this.isAttached;
  // }

  constructor(cd: ChangeDetectorRef) {
    this.cd = cd;
    this.cd.detach();
  }

}
