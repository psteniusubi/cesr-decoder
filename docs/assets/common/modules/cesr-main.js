import { CesrCodeTable, CesrCodeHeader } from "./cesr.js";
import { Base64 } from "../../local/modules/base64.js";

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.9.1
 */
export class OneCharFixedSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override @type {number} */
    get codeSize() { return 1; }
    /**
     * @override
     * @param {string} code 
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        // "[A-Za-z]"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 1),
            type: code.slice(0, 1),
            typeName: this._typeNameGetter,
        });
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.9.2
 */
export class TwoCharFixedSizeCodeTable extends CesrCodeTable {
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
        // "0.{1}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 2),
            type: code.slice(1, 2),
            typeName: this._typeNameGetter,
        });
    };
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.10
 */
export class LargeFixedSizeCodeTable extends CesrCodeTable {
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
        // "[1-3].{3}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 4),
            type: code.slice(1, 4),
            typeName: this._typeNameGetter,
            leadBytes: this._leadBytesGetter,
        });
    };
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {number}
     */
    getLeadBytes(code) {
        switch (code.selector[0]) {
            case '1': return 0;
            case '2': return 1;
            case '3': return 2;
            default: return super.getLeadBytes(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.11
 */
export class SmallVariableSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    get codeSize() { return 4; }
    /** @override */
    mapCodeHeader(code) {
        // "[4-6].{1}.{2}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 2),
            type: code.slice(1, 2),
            digits: code.slice(2, 4),
            size: function () { return Base64.toInt2(this.digits); },
            typeName: this._typeNameGetter,
            leadBytes: this._leadBytesGetter,
        });
    }
    /** @override */
    getTotalLength(code) { return this.codeSize + 4 * code.size; }
    /** @override */
    getLeadBytes(code) {
        switch (code.selector[0]) {
            case '4': return 0;
            case '5': return 1;
            case '6': return 2;
            default: return super.getLeadBytes(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.12
 */
export class LargeVariableSizeCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    get codeSize() { return 8; }
    /** @override */
    mapCodeHeader(code) {
        // "[7-9].{3}.{4}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 4),
            type: code.slice(1, 4),
            digits: code.slice(4, 8),
            size: function () { return Base64.toInt4(this.digits); },
            typeName: this._typeNameGetter,
            leadBytes: this._leadBytesGetter,
        });
    }
    /** @override */
    getTotalLength(code) { return this.codeSize + 4 * code.size; }
    /** @override */
    getLeadBytes(code) {
        switch (code.selector[0]) {
            case '7': return 0;
            case '8': return 1;
            case '9': return 2;
            default: return super.getLeadBytes(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.13.1
 */
export class SmallGroupCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    get codeSize() { return 4; }
    /** @override */
    mapCodeHeader(code) {
        // "-[A-Za-z].{2}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 2),
            type: code.slice(1, 2),
            digits: code.slice(2, 4),
            // count: function () { return Base64.toInt2(this.digits); },
            count: this._countGetter,
            typeName: this._typeNameGetter,
        });
    }
    /** @override */
    getTotalLength(code) { return this.codeSize; }
    /** @override */
    // getGroupCount(code) { return Base64.toInt2(code.digits); }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.13.2
 */
export class LargeGroupCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    get codeSize() { return 8; }
    /** @override */
    mapCodeHeader(code) {
        // "-0[A-Za-z].{5}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 3),
            type: code.slice(2, 3),
            digits: code.slice(3, 8),
            // count: function () { return Base64.toInt4(this.digits); },
            count: this._countGetter,
            typeName: this._typeNameGetter,
        });
    }
    /** @override */
    getTotalLength(code) { return this.codeSize; }
    /** @override */
    // getGroupCount(code) { return Base64.toInt(code.digits); }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.14
 */
export class ProtocolVersionCodeTable extends CesrCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    get codeSize() { return 8; }
    /** @override */
    mapCodeHeader(code) {
        // "--.{3}.{3}"
        return new CesrCodeHeader({
            table: this,
            value: code.slice(0, this.codeSize),
            selector: code.slice(0, 5),
            type: code.slice(2, 5),
            digits: code.slice(5, 8),
            version: function () { return this.digits; },
            typeName: this._typeNameGetter,
        });
    }
    /** @override */
    getTotalLength(code) { return this.codeSize; }
}
