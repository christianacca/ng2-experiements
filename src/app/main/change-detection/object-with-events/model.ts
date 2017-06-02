export type ParentPartial = Partial<Parent>;
export type ParentCtorData = ParentPartial & Pick<Parent, 'age'>;

export interface PropertyChangeData<TTarget extends object, TValue> {
    target: TTarget;
    propertyName: string;
    oldValue?: TValue;
    newValue: TValue;
    parent?: object;
}
export type PropertyChangeHandler =
    <TTarget extends object, TValue>(data: PropertyChangeData<TTarget, TValue>) => void;

let nextUnsubscribeKey = 0;

export class PropertyChangeEvent {
    private handlers: { [unsubKey: number]: PropertyChangeHandler } = {};
    publish<TTarget extends object, TValue>(data: PropertyChangeData<TTarget, TValue>) {
        // tslint:disable-next-line:forin
        for (const key in this.handlers) {
            this.handlers[key](data);
        }
    };
    subscribe(callack: PropertyChangeHandler): number {
        const unsubKey = ++nextUnsubscribeKey;
        this.handlers[unsubKey] = callack;
        return unsubKey;
    }
    unsubscribe(unsubKey: number): boolean {
        const found = this.handlers.hasOwnProperty(unsubKey);
        if (found) {
            delete this.handlers[unsubKey];
        }
        return found;
    }
}

export class Parent {
    get age() {
        return this._age;
    };
    set age(value: number) {
        if (this._age === value) { return; }

        const originalValue = this._age;
        this._age = value;
        this.propertyChanged.publish({ propertyName: 'age', oldValue: originalValue, newValue: this._age, parent: null, target: this });
    }
    children: Parent[] = [];
    propertyChanged = new PropertyChangeEvent();

    private _age = 0;

    * descendants(): Iterable<Parent> {
        for (const child of this.children) {
            yield child;
            yield* Array.from(child.descendants());
        }
    }
    get descendantsAge() {
        return Array.from(this.descendants()).reduce((sum, d) => sum + d.age, 0);
    }

    get isMiddleAge() {
        return this.age >= 40;
    }

    constructor(data: ParentCtorData) {
        Object.assign(this, data);
        // todo: unsubscribe!
        this.children.forEach(c => {
            c.propertyChanged.subscribe(evt => this.publishDescendantAgeChange(evt));
        });
    }

    private shouldBubbleAgeEvent(childPropertyChange: PropertyChangeData<Parent, any>) {
        if (childPropertyChange.propertyName === 'age') {
            return true;
        }

        if (childPropertyChange.propertyName === 'descendantAge' && childPropertyChange.target !== this) {
            return true;
        }

        return false;
    }
    private publishDescendantAgeChange(childPropertyChange: PropertyChangeData<Parent, any>) {
        if (!this.shouldBubbleAgeEvent(childPropertyChange)) {
            return;
        }

        const newValue = this.descendantsAge;
        const oldValue = newValue - (childPropertyChange.newValue - childPropertyChange.oldValue);
        this.propertyChanged
            .publish({ propertyName: 'descendantAge', oldValue, newValue, parent: null, target: this });
    }
}
