import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[rxContext][rxContextOn]'
})
export class RxContextDirective implements OnDestroy {
    private subs: Subscription;
    private viewRef: EmbeddedViewRef<any>;
    @Input()
    set rxContextOn(value: Observable<any>) {
        this.disposeViewSubscription();
        this.createViewSubscription(value);
    }

    constructor(private template: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

    ngOnDestroy(): void {
        this.disposeViewSubscription();
    }

    private createViewSubscription(state$: Observable<any>) {
        this.subs = state$.subscribe(state => this.createOrUpdateView(state));
    }

    private createOrUpdateView(state: any) {
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.template, { '$implicit': state });
        } else {
            this.viewRef.context.$implicit = state;
        }
    }

    private disposeViewSubscription() {
        if (!this.subs) { return; }

        this.subs.unsubscribe();
    }
}
