import { CesrCodeHeader, CesrCodeTable, UnknownCodeError, CesrProtocol } from "./cesr.js";
import { Hex } from "../../local/modules/hex.js";
import { Utf8 } from "../../local/modules/utf8.js";

export class CesrValue {
    /** @type {CesrCodeTable} */
    table;
    /** @type {CesrCodeHeader} */
    header;
    /** @type {Uint8Array} */
    value;
    /** @type {number} */
    get length() { return this.value.length; }
    /** @param {object} code */
    constructor(obj) {
        this.table = obj.table;
        this.header = obj.header;
        this.value = obj.value;
    }
}

/**
 * Get first CESR T code from input
 * @param {CesrProtocol} protocol 
 * @param {string | Uint8Array} input 
 * @returns {CesrValue}
 */
export function getCesrValue(protocol, input) {
    let selector;
    if ("string" === typeof input) {
        selector = input.slice(0, 8);
        input = Utf8.encode(input);
    } else if (input instanceof Uint8Array) {
        const tmp = input.slice(0, 8);
        selector = Utf8.decode(tmp);
    } else {
        throw new TypeError(`expected input "string" or "Uint8Array"`);
    }

    // length of selector
    const selectorSize = protocol.getSelectorSize(selector);
    if (selectorSize > selector.length) throw new UnknownCodeError(`getCesrValue ${protocol.name}`, selector);

    // lookup code table with selector
    const table = protocol.getCodeTable(selector.slice(0, selectorSize));
    if (table.codeSize > selector.length) throw new UnknownCodeError(`getCesrValue ${protocol.name}`, selector);

    // map to cesr code header
    const code = table.mapCodeHeader(selector.slice(0, table.codeSize));

    // get total length of cesr code
    const total = table.getTotalLength(code);
    if (total > input.length) throw new UnknownCodeError(`getCesrValue ${protocol.name}`, JSON.stringify(code));

    // read cesr code
    const value = input.slice(0, total);
    if (total != value.length) throw new UnknownCodeError(`getCesrValue ${protocol.name}`, JSON.stringify(code));

    return new CesrValue({
        table: table,
        header: code,
        value: value,
    });
}

/**
 * Get next CESR frame from input.
 * CESR T group, CESR T op, JSON, MGPK, CBOR, CESR B
 * @param {CesrProtocol} protocol 
 * @param {string | Uint8Array} input 
 * @returns {CesrValue}
 */
export function getCesrFrame(protocol, input) {
    if ("string" === typeof input) {
        input = Utf8.encode(input);
    } else if (input instanceof Uint8Array) {
        // nothing
    } else {
        throw new TypeError(`expected input "string" or "Uint8Array"`);
    }

    // https://weboftrust.github.io/ietf-cesr/draft-ssmith-cesr.html#section-3.6.1
    switch (input[0] & 0xe0) {
        case 0x20: return getTextFrame(protocol, input);
        case 0x60: return getJsonFrame(input);
        // TODO: op, binary, cbor, mgpk
        default: throw new UnknownCodeError(`getCesrFrame`, input[0]);
    }
}

/**
 * @param {CesrProtocol} protocol 
 * @param {Uint8Array} input 
 * @return {CesrValue}
 */
function getTextFrame(protocol, input) {
    const value = getCesrValue(protocol, input);
    switch (value.header.selector) {
        case "-V": break;
        case "-0V": break;
        default: throw new UnknownCodeError(`getTextFrame`, JSON.stringify(value.header));
    }

    const size = value.header.count * 4 + value.header.length;
    if (size > input.length) throw new UnknownCodeError(`getTextFrame`, JSON.stringify(value.header));

    return new CesrValue({
        table: value.table,
        header: value.header,
        value: input.slice(0, size)
    });
}

/**
 * @param {Uint8Array} input 
 * @return {CesrValue}
 */
function getJsonFrame(input) {
    // {"v":"KERI10JSON0000fc_"
    let prefix = Utf8.decode(input.slice(0, 24));
    const pattern = /^{"\w{1}":"(\w{16})_"/;
    const result = pattern.exec(prefix);
    if (result === null) throw new UnknownCodeError(`getJsonFrame`, prefix);

    prefix = result[1];
    const code = new CesrCodeHeader({
        value: prefix,
        selector: prefix.slice(6, 10), // JSON
        type: prefix.slice(0, 6), // KERI10
        digits: prefix.slice(10, 16), // 0000fc,
        size: function () { return Hex.toInt(this.digits); },
    });

    if ("JSON" !== code.selector) throw new UnknownCodeError(`getJsonFrame`, JSON.stringify(code));

    if (code.size > input.length) new UnknownCodeError(`getJsonFrame`, JSON.stringify(code));

    return new CesrValue({
        table: undefined,
        header: code,
        value: input.slice(0, code.size)
    });
}
