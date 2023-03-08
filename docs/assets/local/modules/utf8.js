const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class Utf8 {
    static encode(value) {
        return encoder.encode(value);
    }
    static decode(value) {
        return decoder.decode(value);
    }
}