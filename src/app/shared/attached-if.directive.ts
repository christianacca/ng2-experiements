import {
  Directive, Input, HostBinding, ChangeDetectorRef, Optional, ElementRef,
  EventEmitter, Output, ViewContainerRef, TemplateRef, EmbeddedViewRef, ViewChild, AfterViewInit, Renderer2
} from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[attachedIf]'
})
export class AttachedIfDirective implements AfterViewInit {
  private view: EmbeddedViewRef<object>;
  private _isAttached: boolean;
  private nativeElem: HTMLElement;

  @Input('attachedIf')
  get isAttached() {
    return this._isAttached;
  }
  set isAttached(value: boolean) {
    if (!this.view) {
      this.view = this._viewContainer.createEmbeddedView(this._template);
    }
    if (value) {
      if (this._isAttached !== undefined) {
        this.view.reattach();
        this.renderer.setStyle(this.nativeElem, 'display', '');
      }
      this.onAttach.next(true);
    } else {
      if (this.hide) {
        this.renderer.setStyle(this.nativeElem, 'display', 'none');
      }
      this.view.detach();
      this.onAttach.next(false);
    }
    this._isAttached = value;
  }
  // tslint:disable-next-line:no-input-rename
  @Input('attachedIfHide') hide = true;

  @Output() onAttach = new ReplaySubject<boolean>(1);

  constructor(private _viewContainer: ViewContainerRef, private _template: TemplateRef<object>, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.nativeElem = (this._template.elementRef.nativeElement.nextSibling as HTMLElement);
  }
}
