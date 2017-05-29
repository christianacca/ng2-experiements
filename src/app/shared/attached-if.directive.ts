import { Directive, Input, HostBinding, ChangeDetectorRef, Optional, ElementRef, EventEmitter, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[attachedIf]'
})
export class AttachedIfDirective {
  private _isAttached: boolean;
  private cd: ChangeDetectorRef;
  private displayCssProperty: string;
  private nativeElem: HTMLElement;

  @Input()
  get attachedIf() {
    return this._isAttached;
  }
  set attachedIf(value: boolean) {
    if (value) {
      if (this._isAttached !== undefined) {
        this.cd.reattach();
      }
      this.onAttach.next(true);
    } else {
      this.displayCssProperty = this.nativeElem ? this.nativeElem.style.display : 'block';
      this.cd.detach();
      this.onAttach.next(false);
    }
    this._isAttached = value;
  }
  @HostBinding('style.display')
  get display() {
    return (!this._isAttached && this.hideWhenDetatched) ? 'none' : this.displayCssProperty;
  }
  @Input() hideWhenDetatched = true;

  @Output() onAttach = new ReplaySubject<boolean>(1);

  constructor(cd: ChangeDetectorRef, elem: ElementRef) {
    this.cd = cd;
    this.nativeElem = (elem.nativeElement as HTMLElement);
  }
}
