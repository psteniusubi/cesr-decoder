import { CesrProtocol, CesrCodeTable, UnknownCodeError, CesrCodeHeader } from "./cesr.js";
import { Base64 } from "../../local/modules/base64.js";

import { CesrTables, CesrContext } from "./cesr-tables.js";

export class CesrSchemaProtocol extends CesrProtocol {
    /**
     * @param  {...string} names 
     * @returns {CesrSchemaProtocol}
     */
    static async load(...names) {
        const tables = await CesrTables.load();
        return new CesrSchemaProtocol(tables, ...names);
    }
    /** @type {CesrTables} */
    tables;
    /** @type {CesrContext} */
    context;
    /**
     * @param {CesrTables} tables 
     * @param {...string} names 
     */
    constructor(tables, ...names) {
        super();
        this.tables = tables;
        this.context = tables.context(...names);
    }
    /**
     * @override
     * @param {string} selector 
     * @returns {number}
     */
    getSelectorSize(selector) {
        return 8;
    }
    /** 
     * @override
     * @param {string} selector  
     * @returns {CesrCodeTable}
     */
    getCodeTable(selector) {
        const spec = this.context.lookup(selector);
        if (spec === null) throw new UnknownCodeError(`${this.name}.getCodeTable`, selector);
        return new CesrSchemaCodeTable(this, spec);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code  
     * @returns {string}
     */
    getTypeName(code) {
        throw new TypeError(`${this.name}.getTypeName()`);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    isFrame(code) {
        return code.table.isCounter && "counter" in code.table.spec && !("count" in code.table.spec.counter);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    isGroup(code) {
        return code.table.isCounter && "counter" in code.table.spec && "count" in code.table.spec.counter;
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {boolean}
     */
    hasContext(code) {
        return this.isGroup(code) && "context" in code.table.spec.counter;
    }
    /**
     * @override
     * @param {CesrCodeHeader} code 
     * @returns {CesrProtocol}
     */
    getContext(code) {
        return this.hasContext(code)
            ? new CesrSchemaProtocol(this.tables, ...code.table.spec.counter.context)
            : null;
    }
}

// FixedSize, VariableSize, Indexer, Counter, Version
export class CesrSchemaCodeTable extends CesrCodeTable {
    /** @type {object} */
    spec;
    /**
     * @param {CesrSchemaProtocol} protocol 
     * @param {object} spec 
     */
    constructor(protocol, spec) {
        super(protocol, spec);
        this.spec = spec;
    }
    get isFixedSize() { return this.spec.table_type.includes("FixedSize"); }
    get isVariableSize() { return this.spec.table_type.includes("VariableSize"); }
    get isIndexer() { return this.spec.table_type.includes("Indexer"); }
    get isCounter() { return this.spec.table_type.includes("Counter"); }
    get isVersion() { return this.spec.table_type.includes("Version"); }
    /**
     * @override
     * @type {number}
     */
    get codeSize() { return this.spec.default_size.hs + (this.spec.default_size.ss ?? 0); }
    /**
     * @override
     * @param {string} code  
     * @returns {CesrCodeHeader}
     */
    mapCodeHeader(code) {
        // value, selector, type, digits, typeName, leadBytes, size, count, quadlets, version, index, ondex
        const header = {};
        header["table"] = this;
        header["value"] = code.slice(0, this.codeSize);
        header["selector"] = code.slice(0, this.spec.default_size.hs);
        header["type"] = header.selector;
        // digits
        if ("ss" in this.spec.default_size) {
            header["digits"] = code.slice(this.spec.default_size.hs, this.codeSize);
        }
        // typeName
        header["typeName"] = this.spec.name;
        if (this.isFixedSize || this.isVariableSize) {
            // leadBytes
            if ("ls" in this.spec.default_size) {
                header["leadBytes"] = this.spec.default_size.ls;
            }
        }
        // size, index, ondex, count, version
        if (this.isVariableSize) {
            // size
            header["size"] = Base64.toInt(header.digits);
        }
        if (this.isCounter) {
            if ("counter" in this.spec && "count" in this.spec.counter) {
                // count
                const digits = Base64.toInt(header.digits);
                switch (this.spec.counter.count) {
                    case "*1": header["count"] = digits * 1; break;
                    case "*2": header["count"] = digits * 2; break;
                    case "*3": header["count"] = digits * 3; break;
                    case "*4": header["count"] = digits * 4; break;
                    case "*2+1": header["count"] = digits * 2 + 1; break;
                    default: throw new UnknownCodeError(`${this.name}.mapCodeHeader`, this.spec.counter.count);
                }
            } else {
                // quadlets
                const digits = Base64.toInt(header.digits);
                header["quadlets"] = digits;
                header["count"] = digits;
            }
        }
        if (this.isVersion) {
            // version
            header["version"] = header.digits;
        }
        if (this.isIndexer) {
            // index, ondex
            if ("os" in this.spec.default_size && this.spec.default_size.os > 0) {
                header["index"] = Base64.toInt(header.digits.slice(0, this.spec.default_size.os));
                header["ondex"] = Base64.toInt(header.digits.slice(this.spec.default_size.os));
            } else {
                header["index"] = Base64.toInt(header.digits);
            }
        }
        return new CesrCodeHeader(header);
    }
    /**
     * @override
     * @param {CesrCodeHeader} code  
     * @returns {number}
     */
    getTotalLength(code) {
        if (this.isFixedSize) {
            if ("sizes" in this.spec && "fs" in this.spec.sizes) {
                return this.spec.sizes.fs;
            } else {
                throw new UnknownCodeError(`${this.name}.getTotalLength`, code.value);
            }
        } else if (this.isVariableSize) {
            return this.codeSize + (4 * code.size);
        } else {
            return this.codeSize;
        }
    }
    /** @returns {string} */
    toJSON() {
        return `CesrSchemaCodeTable(${this.spec.table_type})`;
    }
}

export { CesrTables, CesrContext };
export { CesrCodeHeader, CesrValue, getCesrValue, getCesrFrame } from "./cesr.js";
