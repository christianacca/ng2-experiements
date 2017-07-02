import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[rxContext][rxContextOn]'
})
export class RxContextDirective implements OnInit, OnDestroy {
    subs: Subscription;
    private viewRef: EmbeddedViewRef<any>;
    @Input() rxContextOn: Observable<any>;
    constructor(private template: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

    ngOnDestroy(): void {
        if (!this.subs) { return; }

        this.subs.unsubscribe();
    }

    ngOnInit(): void {
        this.subs = this.rxContextOn.subscribe(state => {
            if (!this.viewRef) {
                this.viewRef = this.viewContainer.createEmbeddedView(this.template, { '$implicit': state });
            } else {
                this.viewRef.context.$implicit = state;
            }
        });
    }
}
