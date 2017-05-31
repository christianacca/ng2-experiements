export type ParentPartial = Partial<Parent>;
export type ParentCtorData = ParentPartial & Pick<Parent, 'age'>;


export class Parent {
    age = 0;
    children: Parent[] = [];
    * descendants(): Iterable<Parent> {
        for (const child of this.children) {
            yield child;
            yield * Array.from(child.descendants());
        }
    }
    get descendantsAge() {
        return Array.from(this.descendants()).reduce((sum, d) => sum + d.age, 0);
    }

    constructor(data: ParentCtorData) {
        Object.assign(this, data);
    }
}
