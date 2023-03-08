export const type = Symbol();
export const selector = Symbol();
export class TypeSelector {
    get [type]() { throw new TypeError(); }
    get types() { return Object.getOwnPropertyNames(this[type]); }
    isType(value) { return Object.hasOwn(this[type], value); }
    getSelector(value) { return this.isType(value) ? this[type][value] : null; }
    get [selector]() { throw new TypeError(); }
    get selectors() { return Object.getOwnPropertyNames(this[selector]); }
    isSelector(value) { return Object.hasOwn(this[selector], value); }
    getType(value) { return this.isSelector(value) ? this[selector][value] : null; }
}
