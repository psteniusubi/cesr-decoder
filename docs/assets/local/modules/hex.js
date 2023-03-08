export class Hex {
    static #HEX = "0123456789ABCDEF";
    /**
     * @param {string} value 
     * @returns {number}
     */
    static valueOf(ch) {
        // TODO: reverse map instead of indexOf
        const r = Hex.#HEX.indexOf(ch);
        if (r == -1) throw new Error();
        return r;
    }
    /**
     * @param {string} value 
     * @returns {number}
     */
    static toInt(value) {
        let result = 0;
        for (const ch of value.toUpperCase()) {
            result <<= 4;
            result |= Hex.valueOf(ch);
        }
        return result;
    }
}