export type HumanPartial = Partial<Human>;
export type HumanCtorData = HumanPartial & Pick<Human, 'age'>;

export interface PropertyChangeData<TTarget extends object, TValue> {
    target: TTarget;
    propertyName: string;
    oldValue?: TValue;
    newValue: TValue;
    parent?: object;
}
export type PropertyChangeHandler =
   (data: PropertyChangeData<any, any>) => void;

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

export class Human {
    get age() {
        return this._age;
    };
    set age(value: number) {
        if (this._age === value) { return; }

        const originalValue = this._age;
        this._age = value;
        this.propertyChanged.publish({ propertyName: 'age', oldValue: originalValue, newValue: value, parent: null, target: this });
    }
    get iq() {
        return this._iq;
    };
    set iq(value: number) {
        if (this._age === value) { return; }

        const originalValue = this._iq;
        this._iq = value;
        this.propertyChanged.publish({ propertyName: 'iq', oldValue: originalValue, newValue: value, parent: null, target: this });
    }
    children: Human[] = [];
    propertyChanged = new PropertyChangeEvent();
    get score() {
        return this._score;
    };
    set score(value: number) {
        if (this._score === value) { return; }

        const originalValue = this._score;
        this._score = value;
        this.propertyChanged.publish({ propertyName: 'score', oldValue: originalValue, newValue: value, parent: null, target: this });
    }
    parent: Human;

    private _age = 0;
    private _iq = 0;
    private _score = 0;

    * descendants(): Iterable<Human> {
        for (const child of this.children) {
            yield child;
            yield* Array.from(child.descendants());
        }
    }
    get descendantsAge() {
        return Array.from(this.descendants()).reduce((sum, d) => sum + d.age, 0);
    }

    get siblings() {
        return this.parent.children.filter(x => x !== this);
    }

    get isMiddleAge() {
        return this.age >= 40;
    }

    get hasMiddleAgeDescendant() {
        return !!this.children.find(c => c.isMiddleAge);
    }

    constructor(data: HumanCtorData) {
        Object.assign(this, data);
        // todo: unsubscribe!
        this.children.forEach(c => {
            c.propertyChanged.subscribe(evt => this.publishDescendantChange(evt));
        });
    }

    private publishDescendantChange(childPropertyChange: PropertyChangeData<Human, any>) {
        if (childPropertyChange.target === this) {
            return;
        }

        this.propertyChanged.publish(childPropertyChange);
    }
}
