import { UnknownCodeError, CesrProtocol, CesrCodeTable, CesrCodeHeader } from "./cesr.js";
import { Indexer } from "./keri-names.js";
import { IndexedTwoCharFixedSizeCodeTable, IndexedFourCharFixedSizeCodeTable, IndexedSixCharFixedSizeCodeTable, IndexedEightCharFixedSizeCodeTable } from "./cesr-indexed.js";

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-4.3
 */
export class KeriIndexedProtocol extends CesrProtocol {
    /** 
     * @override 
     * @param {string} selector 
     * @returns {number}
     */
    getSelectorSize(selector) { return 1; }
    /** 
     * @override 
     * @param {string} selector 
     * @returns {CesrCodeTable}
     */
    getCodeTable(selector) {
        if (selector.length < 1) throw new UnknownCodeError(`${this.constructor.name}.getCodeTable`, selector);
        if (selector[0] >= 'A' && selector[0] <= 'Z') return new KeriIndexedTwoCharFixedSizeCodeTable(this);
        if (selector[0] >= 'a' && selector[0] <= 'z') return new KeriIndexedTwoCharFixedSizeCodeTable(this);
        switch (selector[0]) {
            case '0': return new KeriIndexedFourCharFixedSizeCodeTable(this);
            case '2': return new KeriIndexedSixCharFixedSizeCodeTable(this);
            case '3': return new KeriIndexedEightCharFixedSizeCodeTable(this);
            default: return super.getCodeTable(selector);
        }
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {string}
     */
    getTypeName(code) {
        if (Indexer.isSelector(code.selector)) return Indexer.getType(code.selector);
        return undefined;
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class KeriIndexedTwoCharFixedSizeCodeTable extends IndexedTwoCharFixedSizeCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {number}
     */
    getTotalLength(code) {
        switch (code.type) {
            case 'A': return 88;
            case 'B': return 88;
            case 'C': return 88;
            case 'D': return 88;
            default: super.getTotalLength(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class KeriIndexedFourCharFixedSizeCodeTable extends IndexedFourCharFixedSizeCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {number}
     */
    getTotalLength(code) {
        switch (code.type) {
            case 'A': return 156;
            case 'B': return 156;
            default: super.getTotalLength(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class KeriIndexedSixCharFixedSizeCodeTable extends IndexedSixCharFixedSizeCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {number}
     */
    getTotalLength(code) {
        switch (code.type) {
            case 'A': return 92;
            case 'B': return 92;
            case 'C': return 92;
            case 'D': return 92;
            default: super.getTotalLength(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.18.1
 */
export class KeriIndexedEightCharFixedSizeCodeTable extends IndexedEightCharFixedSizeCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {number}
     */
    getTotalLength(code) {
        switch (code.type) {
            case 'A': return 160;
            case 'B': return 160;
            default: super.getTotalLength(code);
        }
    }
}
