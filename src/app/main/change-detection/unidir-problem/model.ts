export type HumanPartial = Partial<Humman>;
export type HumanCtorData = HumanPartial & Pick<Humman, 'age'>;


export class Humman {
    age = 0;
    iq = 0;
    children: Humman[] = [];
    * descendants(): Iterable<Humman> {
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
