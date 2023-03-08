export class Base64 {
    static #BASE64
        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        + "abcdefghijklmnopqrstuvwxyz"
        + "0123456789"
        + "-_";
    /**
     * @param {string} value 
     * @returns {number}
     */
    static valueOf(ch) {
        // TODO: reverse map instead of indexOf
        const r = Base64.#BASE64.indexOf(ch);
        if (r == -1) throw new Error();
        return r;
    }
    /**
     * @param {string} value 
     * @returns {number}
     */
    static toInt1(value) {
        return Base64.toInt(value.slice(0, 1));
    }
    /**
     * @param {string} value 
     * @returns {number}
     */
    static toInt2(value) {
        return Base64.toInt(value.slice(0, 2));
    }
    /**
     * @param {string} value 
     * @returns {number}
     */
    static toInt3(value) {
        return Base64.toInt(value.slice(0, 3));
    }
    /**
     * @param {string} value 
     * @returns {number}
     */
    static toInt4(value) {
        return Base64.toInt(value.slice(0, 4));
    }
    /**
     * @param {string} value 
     * @returns {number}
     */
    static toInt(value) {
        let result = 0;
        for (const ch of value) {
            result <<= 6;
            result |= Base64.valueOf(ch);
        }
        return result;
    }
}
