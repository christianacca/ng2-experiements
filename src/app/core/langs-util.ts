/**
 * Determine if the argument is shaped like a Promise
 */
export function isPromise(obj: any): obj is Promise<any> {
  // allow any Promise/A+ compliant thenable.
  // It's up to the caller to ensure that obj.then conforms to the spec
  return !!obj && typeof obj.then === 'function';
}

type ValueTransformer = (value: any) => any;
interface ValueTransform {
    parser?: ValueTransformer,
    formatter?: ValueTransformer
}

type PropertyModifiers = Pick<PropertyDescriptor, 'configurable' | 'enumerable'>;

export interface PropertyDescriptorExtension extends ValueTransform, PropertyModifiers { }

const defaultDescriptor: PropertyDescriptorExtension = {
    configurable: true,
    enumerable: true,
    formatter: undefined,
    parser: undefined
};

function newProperty(propertyKey: string, attributes: PropertyDescriptorExtension) {
    const key = Symbol(propertyKey)
    const attrs = { ...defaultDescriptor, ...attributes };
    const { configurable, enumerable, formatter, parser } = attrs;
    const getter = formatter
        ? function () { return formatter.call(this, this[key]); }
        : function () { return this[key]; }
    const setter = parser
        ? function (value: any) { this[key] = parser.call(this, value) }
        : function (value: any) { this[key] = value }
    return {
        get: getter,
        set: setter,
        configurable: configurable,
        enumerable: enumerable
    };
}

function wrapProperty(
    property: PropertyDescriptor,
    attributes: PropertyDescriptorExtension) {
    const attrs = { ...property, ...attributes };
    const { configurable, enumerable, formatter, parser } = attrs;
    const getter = formatter
        ? function () { return formatter.call(this, property.get.call(this)); }
        : function () { return property.get.call(this); }
    const setter = parser
        ? function (value: any) { property.set.call(this, parser.call(this, value)); }
        : function (value: any) { property.set.call(this, value); }
    return {
        get: getter,
        set: setter,
        enumerable: enumerable,
        configurable: configurable
    };
}

export function addOrExtendProperty(target: any, propertyKey: string, attributes?: PropertyDescriptorExtension) {
    const existingProperty = Object.getOwnPropertyDescriptor(target, propertyKey);
    const property = existingProperty ? wrapProperty(existingProperty, attributes) : newProperty(propertyKey, attributes);
    Object.defineProperty(target, propertyKey, property)
}
