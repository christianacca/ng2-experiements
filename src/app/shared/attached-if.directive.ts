import { Directive, Input, HostBinding, ChangeDetectorRef, Optional, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[attachedIf]'
})
export class AttachedIfDirective {
  private _isAttached: boolean;
  cd: ChangeDetectorRef;
  private displayCssProperty: string;
  private nativeElem: HTMLElement;

  @Input()
  get attachedIf() {
    return this._isAttached;
  }
  set attachedIf(value: boolean) {
    if (value) {
      this.cd.reattach();
    } else {
      this.displayCssProperty = this.nativeElem ? this.nativeElem.style.display : 'block';
      this.cd.detach();
    }
    this._isAttached = value;
  }
  @Input() hideWhenDetatched = true;

  @HostBinding('style.display') get display() {
    return (!this._isAttached && this.hideWhenDetatched) ? 'none' : this.displayCssProperty;
  }

  constructor(cd: ChangeDetectorRef, elem: ElementRef) {
    this.cd = cd;
    this.nativeElem = (elem.nativeElement as HTMLElement);
    this.attachedIf = false;
  }

}
