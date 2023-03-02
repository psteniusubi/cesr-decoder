import { UnknownCodeError, CesrProtocol, CesrCodeTable, CesrCodeHeader } from "./cesr.js";
import { OneCharFixedSizeCodeTable, TwoCharFixedSizeCodeTable, LargeFixedSizeCodeTable, SmallVariableSizeCodeTable, LargeVariableSizeCodeTable, SmallGroupCodeTable, LargeGroupCodeTable, ProtocolVersionCodeTable } from "./cesr-main.js";
import { Matter, Counter } from "./keri-names.js";
import { Base64 } from "../../local/modules/base64.js";

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-4.2
 */
export class KeriMainProtocol extends CesrProtocol {
    /** 
     * @override 
     * @param {string} selector 
     * @returns {number}
     */
    getSelectorSize(selector) {
        switch (selector.length) {
            case 0: return 1;
            default: return (selector[0] === '-') ? 2 : 1;
        }
    }
    /** 
     * @override 
     * @param {string} selector 
     * @returns {CesrCodeTable}
     */
    getCodeTable(selector) {
        if (selector.length < 1) throw new UnknownCodeError(`${this.constructor.name}.getCodeTable`, selector);
        if (selector[0] >= 'A' && selector[0] <= 'Z') return new KeriOneCharFixedSizeCodeTable(this);
        if (selector[0] >= 'a' && selector[0] <= 'z') return new KeriOneCharFixedSizeCodeTable(this);
        switch (selector[0]) {
            case '0': return new KeriTwoCharFixedSizeCodeTable(this);
            case '1': return new KeriLargeFixedSizeCodeTable(this);
            case '2': return new KeriLargeFixedSizeCodeTable(this);
            case '3': return new KeriLargeFixedSizeCodeTable(this);
            case '4': return new SmallVariableSizeCodeTable(this);
            case '5': return new SmallVariableSizeCodeTable(this);
            case '6': return new SmallVariableSizeCodeTable(this);
            case '7': return new LargeVariableSizeCodeTable(this);
            case '8': return new LargeVariableSizeCodeTable(this);
            case '9': return new LargeVariableSizeCodeTable(this);
            case '-': return this.getFramingCodeTable(selector);
            default: return super.getCodeTable(selector);
        }
    }
    /**
     * @param {string} selector 
     * @returns {CesrCodeTable}
     */
    getFramingCodeTable(selector) {
        if (selector.length < 2) throw new UnknownCodeError(`${this.constructor.name}.getFramingCodeTable`, selector);
        if (selector[1] >= 'A' && selector[1] <= 'Z') return new KeriSmallGroupCodeTable(this);
        if (selector[1] >= 'a' && selector[1] <= 'z') return new KeriSmallGroupCodeTable(this);
        switch (selector[1]) {
            case '0': return new KeriLargeGroupCodeTable(this);
            case '-': return new ProtocolVersionCodeTable(this);
            default: throw new UnknownCodeError(`${this.constructor.name}.getFramingCodeTable`, selector);
        }
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {string}
     */
    getTypeName(code) {
        if (Matter.isSelector(code.selector)) return Matter.getType(code.selector);
        if (Counter.isSelector(code.selector)) return Counter.getType(code.selector);
        return undefined;
    }
    /**
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    static isIndexGroup(code) {
        switch (code.selector) {
            case "-A":
            case "-B":
                return true;
            default:
                return false;
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.9.1
 */
export class KeriOneCharFixedSizeCodeTable extends OneCharFixedSizeCodeTable {
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
            case 'A': return 44;
            case 'B': return 44;
            case 'C': return 44;
            case 'D': return 44;
            case 'E': return 44;
            case 'F': return 44;
            case 'G': return 44;
            case 'H': return 44;
            case 'I': return 44;
            case 'J': return 44;
            case 'K': return 76;
            case 'L': return 76;
            case 'M': return 4;
            case 'N': return 12;
            case 'O': return 44;
            case 'P': return 124;
            default: return super.getTotalLength(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.9.2
 */
export class KeriTwoCharFixedSizeCodeTable extends TwoCharFixedSizeCodeTable {
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
            case 'A': return 24;
            case 'B': return 88;
            case 'C': return 88;
            case 'D': return 88;
            case 'E': return 88;
            case 'F': return 88;
            case 'G': return 88;
            case 'H': return 88;
            default: return super.getTotalLength(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.10
 */
export class KeriLargeFixedSizeCodeTable extends LargeFixedSizeCodeTable {
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
        switch (code.selector) {
            case '1AAA': return 48;
            case '1AAB': return 48;
            case '1AAC': return 80;
            case '1AAD': return 80;
            case '1AAE': return 156;
            case '1AAF': return 8;
            case '1AAG': return 36;
            case '1AAH': return 100;
            default: return super.getTotalLength(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.13.1
 */
export class KeriSmallGroupCodeTable extends SmallGroupCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    getGroupCount(code) {
        // https://github.com/WebOfTrust/keripy/blob/development/src/keri/core/coring.py#L4158
        const count = Base64.toInt2(code.digits);
        switch (code.selector) {
            case '-A': return count;
            case '-B': return count;
            case '-C': return count * 2;
            case '-D': return count * 4;
            case '-E': return count * 2;
            case '-F': return count * 4;
            case '-G': return count * 2;
            case '-H': return count * 2;
            case '-J': return count;
            case '-K': return 1 + count * 2;
            case '-L': return count;
            case '-V': return count;
            default: return super.getGroupCount(code);
        }
    }
}

/**
 * https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.13.2
 */
export class KeriLargeGroupCodeTable extends LargeGroupCodeTable {
    /** @override */
    constructor(protocol) {
        super(protocol);
    }
    /** @override */
    getGroupCount(code) {
        const count = Base64.toInt(code.digits);
        switch (code.selector) {
            case '-0V': return count;
            default: return super.getGroupCount(code);
        }
    }
}
