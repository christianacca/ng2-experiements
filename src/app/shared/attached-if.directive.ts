// tslint:disable:no-input-rename
import {
  Directive, Input, HostBinding, ChangeDetectorRef, Optional, ElementRef,
  EventEmitter, Output, ViewContainerRef, TemplateRef, EmbeddedViewRef, ViewChild, AfterViewInit, Renderer2
} from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

interface ContextBinding {
  attached: boolean;
  onDetach$: Observable<boolean>;
}


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[attachedIf]'
})
export class AttachedIfDirective implements AfterViewInit {
  private view: EmbeddedViewRef<ContextBinding>;
  private nativeElem: HTMLElement;
  private onDetachSubject = new ReplaySubject<boolean>(1);
  private onDetach$ = this.onDetachSubject.asObservable();

  @Input('attachedIf')
  set isAttached(value: boolean) {
    const hasView = !!this.view;
    if (!hasView) {
      this.view = this._viewContainer.createEmbeddedView<ContextBinding>(this._template, { attached: value, onDetach$: this.onDetach$ });
    }
    if (value) {
      if (hasView) {
        this.view.reattach();
        this.renderer.setStyle(this.nativeElem, 'display', '');
      }
    } else {
      if (this.hide) {
        this.renderer.setStyle(this.nativeElem, 'display', 'none');
      }
      this.view.detach();
    }
    this.view.context.attached = true;
    this.onDetachSubject.next(!value);
  }
  @Input('attachedIfHide') hide = true;

  constructor(private _viewContainer: ViewContainerRef, private _template: TemplateRef<ContextBinding>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.nativeElem = (this._template.elementRef.nativeElement.nextElementSibling as HTMLElement);
  }
}
