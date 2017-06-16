import { Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export function LifecycleEvents(): ClassDecorator {
    return function (constructor: Type<any>) {
        const lifecycleHooks = [
            'ngOnInit',
            'ngOnChanges',
            'ngOnDestroy'
        ];
        const component = constructor.name;

        const subject = new Subject();
        lifecycleHooks.forEach(hook => {
            const original = constructor.prototype[hook];

            constructor.prototype[hook] = function (...args) {
                console.log(`%c ${component} - ${hook}`, `color: #4CAF50; font-weight: bold`, ...args);
                if (original) {
                    subject.next({
                        hook,
                        args,
                        component: this
                    })
                    original.apply(this, args);
                }
            }
        });
    }
}
