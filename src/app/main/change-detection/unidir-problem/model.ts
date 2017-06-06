export type HumanPartial = Partial<Human>;
export type HumanCtorData = HumanPartial & Pick<Human, 'age'>;


export class Human {
    age = 0;
    iq = 0;
    children: Human[] = [];
    * descendants(): Iterable<Human> {
        for (const child of this.children) {
            yield child;
            yield * Array.from(child.descendants());
        }
    }
    get descendantsAge() {
        return Array.from(this.descendants()).reduce((sum, d) => sum + d.age, 0);
    }

    get isMiddleAge() {
        return this.age >= 40;
    }

    constructor(data: HumanCtorData) {
        Object.assign(this, data);
    }
}
