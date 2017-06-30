// note: webpack complained when this was an interface so made it an abstract class whose interface we're using
export abstract class Model {
  firstName: string;
  lastName: string;
  age: number;
  child: ChildModel;
  readonly name: string;
}

export interface ChildModel {
  name?: string;
}

const lastNameKey = Symbol('lastName');

export class ModelClass implements Model {
  private _age = 25;
  get age() {
    return this._age;
  }
  set age(v: number) {
    this._age = v;
  }
  child = {};
  firstName = 'c';
  get lastName() {
    return this[lastNameKey];
  }
  set lastName(v: string) {
    this[lastNameKey] = v;
  }
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor() {
    this.lastName = 'crow';
  }
}
