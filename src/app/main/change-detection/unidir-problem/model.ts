export type HumanPartial = Partial<Human>;
export type HumanCtorData = HumanPartial & Pick<Human, 'age' | 'score'>;


export class Human {
    age = 0;
    iq = 0;
    children: Human[] = [];
    hairColor = 'brown';
    score = 0;
    parent: Human;
    test = { name: 'cc' };
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

    get hasMiddleAgeDescendant() {
        return !!this.children.find(c => c.isMiddleAge);
    }

    get siblings() {
        return this.parent.children.filter(x => x !== this);
    }

    constructor(data: HumanCtorData) {
        Object.assign(this, data);
    }
}
