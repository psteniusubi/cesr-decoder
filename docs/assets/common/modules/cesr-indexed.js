import { CesrCodeTable, CesrCodeHeader } from "./cesr.js";
import { Base64 } from "../../local/modules/base64.js";

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class IndexedTwoCharFixedSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override @type {number} */
    get codeSize() { return 2; }
    /**
     * @override
     * @param {string} code 
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        return new CesrCodeHeader({
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 1),
            type: code.slice(0, 1),
            digits: code.slice(1, 2),
            index: function () { return Base64.toInt1(this.digits); },
            typeName: this._typeNameGetter,
        });
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class IndexedFourCharFixedSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override @type {number} */
    get codeSize() { return 4; }
    /**
     * @override
     * @param {string} code 
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        return new CesrCodeHeader({
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 2),
            type: code.slice(1, 2),
            digits: code.slice(2, 4),
            index: function () { return Base64.toInt1(this.digits.slice(0, 1)); },
            ondex: function () { return Base64.toInt1(this.digits.slice(1, 2)); },
            typeName: this._typeNameGetter,
        });
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class IndexedSixCharFixedSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override @type {number} */
    get codeSize() { return 6; }
    /**
     * @override
     * @param {string} code 
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        return new CesrCodeHeader({
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 2),
            type: code.slice(1, 2),
            digits: code.slice(2, 6),
            index: function () { return Base64.toInt2(this.digits.slice(0, 2)); },
            ondex: function () { return Base64.toInt2(this.digits.slice(2, 4)); },
            typeName: this._typeNameGetter,
        });
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class IndexedEightCharFixedSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override @type {number} */
    get codeSize() { return 8; }
    /**
     * @override
     * @param {string} code 
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        return new CesrCodeHeader({
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 2),
            type: code.slice(1, 2),
            digits: code.slice(2, 8),
            index: function () { return Base64.toInt3(this.digits.slice(0, 3)); },
            ondex: function () { return Base64.toInt3(this.digits.slice(3, 6)); },
            typeName: this._typeNameGetter,
        });
    }
}
