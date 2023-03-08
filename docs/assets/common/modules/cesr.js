/*

https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html
https://weboftrust.github.io/ietf-cesr-proof/draft-pfeairheller-cesr-proof.html
https://trustoverip.github.io/tswg-acdc-specification/draft-ssmith-acdc.html

https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

*/

export class UnknownCodeError extends Error {
    /** @type {string} */
    code;
    /** 
     * @param {string} message 
     * @param {string} code
     */
    constructor(message, code) {
        super(`${message} code=${code}`);
        this.code = code;
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.16 
 */
export class CesrCodeHeader {
    /** @type {CesrCodeTable} */
    table;
    /** @type {string} */
    value;
    /** @type {string} */
    selector;
    /** @type {string} */
    type;
    /** 
     * Length of code header. Same as {@link CesrCodeTable.codeSize}
     * @type {number} 
     */
    get length() { return this.value.length; }
    /** @param {object} obj */
    constructor(obj) {
        this.table = obj.table;
        this.value = obj.value;
        this.selector = obj.selector;
        this.type = obj.type;
        // define optional property digits
        if (Object.hasOwn(obj, "digits")) this.digits = obj.digits;
        // define optional context specific properties
        for (const key of ["typeName", "leadBytes", "size", "count", "quadlets", "version", "index", "ondex"]) {
            if (Object.hasOwn(obj, key) && obj[key] !== undefined) {
                const descriptor = {
                    enumerable: true
                };
                if (typeof obj[key] === "function") {
                    descriptor["get"] = obj[key];
                } else {
                    descriptor["value"] = obj[key];
                }
                Object.defineProperty(this, key, descriptor);
            }
        }
    }
}

/**
 * Map selector string of 1 or 2 chars to code table {@link CesrCodeTable}
 * Abstract class
 * Implementations {@link KeriMainProtocol} and {@link KeriIndexedProtocol}
 */
export class CesrProtocol {
    /** @type {string} */
    get name() { return this.constructor.name; }
    /** 
     * @param {string} selector  
     * @returns {number}
     */
    getSelectorSize(selector) {
        return 1;
    }
    /** 
     * @param {string} selector  
     * @returns {CesrCodeTable}
     */
    getCodeTable(selector) {
        throw new UnknownCodeError(`${this.name}.getCodeTable`, selector);
    }
    /** 
     * @param {CesrCodeHeader} code  
     * @returns {string}
     */
    getTypeName(code) {
        return undefined;
    }
    /**
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    isFrame(code) {
        return false;
    }
    /**
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    isGroup(code) {
        return false;
    }
    /**
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    hasContext(code) {
        return false;
    }
    /**
     * @param {CesrCodeHeader} code 
     * @returns {CesrProtocol}
     */
    getContext(code) {
        return undefined;
    }
    /** 
     * @returns {string}
     */
    toJSON() { return this.name; }
}

/**
 * Split selector string into selector specific code header parts
 * Abstract class
 * Many implementations
 */
export class CesrCodeTable {
    #protocol;
    /**
     * @param {CesrProtocol} protocol 
     */
    constructor(protocol) {
        if (!(protocol instanceof CesrProtocol)) throw new TypeError();
        this.#protocol = protocol;
    }
    /** @type {string} */
    get name() { return this.constructor.name; }
    /** @type {number} */
    get codeSize() { throw new UnknownCodeError(`${this.name}.codeSize`); }
    /** 
     * @param {string} code  
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        code = code.slice(0, this.codeSize);
        throw new UnknownCodeError(`${this.name}.mapCodeHeader`, code);
    }
    /** 
     * @param {CesrCodeHeader} code  
     * @returns {number}
     */
    getTotalLength(code) {
        throw new UnknownCodeError(`${this.name}.getTotalLength`, code.value);
    }
    /** 
     * @param {CesrCodeHeader} code  
     * @returns {number}
     */
    getGroupCount(code) {
        throw new UnknownCodeError(`${this.name}.getGroupCount`, code.value);
    }
    /** 
     * @param {CesrCodeHeader} code  
     * @returns {number}
     */
    getLeadBytes(code) {
        throw new UnknownCodeError(`${this.name}.getLeadBytes`, code.value);
    }
    /**
     * Implements CesrCodeHeader.typeName
     * @returns {funtion}
     */
    get _typeNameGetter() {
        const self = this;
        /**
         * @this {CesrCodeHeader}
         */
        return function () {
            return self.#protocol.getTypeName(this);
        }
    }
    /**
     * Implements CesrCodeHeader.count
     * @returns {funtion}
     */
    get _countGetter() {
        const self = this;
        /**
         * @this {CesrCodeHeader}
         */
        return function () {
            return self.getGroupCount(this);
        }
    }
    /**
     * Implements CesrCodeHeader.leadBytes
     * @returns {funtion}
     */
    get _leadBytesGetter() {
        const self = this;
        /**
         * @this {CesrCodeHeader}
         */
        return function () {
            return self.getLeadBytes(this);
        }
    }
    /** @returns {string} */
    toJSON() { return this.name; }
}

export { CesrValue, getCesrValue, getCesrFrame } from "./cesr-parser.js";
