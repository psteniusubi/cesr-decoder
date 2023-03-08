import { getCesrValue, getCesrFrame, CesrProtocol, CesrValue } from "../../common/modules/cesr.js";

class Group {
    /** @type {Group} */
    next;
    /** @type {CesrProtocol} */
    protocol;
    /** @type {object} */
    value;
    constructor(obj) {
        this.next = obj?.next;
        this.protocol = obj?.protocol;
        this.value = obj?.value;
    }
    toJSON() {
        return `Group(protocol=${this.protocol?.name})`;
    }
}

class Frame {
    /** @type {Frame} */
    next;
    /** @type {number} */
    end;
    /** 
     * Either {@link getCesrValue} or {@link getCesrFrame}
     * @type {getCesrValue | getCesrFrame} 
     * */
    valueGetter;
    /** @type {Group} */
    group;
    /** @type {object} */
    value;
    constructor(obj) {
        this.next = obj?.next;
        this.end = obj?.end;
        this.valueGetter = obj?.valueGetter;
        this.group = obj?.group;
        this.value = obj?.value;
    }
    toJSON() {
        return `Frame(end=${this.end})`;
    }
}

export class DecoderState {
    /** @type {Frame} */
    currentFrame;
    /** @type {Group} */
    get currentGroup() { return this.currentFrame.group; }
    /** @type {number} */
    start;
    /** @type {number} */
    get end() { return this.currentFrame.end; }
    /** @type {boolean} */
    get isEmpty() { return this.currentFrame.next === null; }
    /**
     * @param {object} value 
     */
    constructor(value) {
        this.currentFrame = new Frame({
            next: null,
            end: undefined,
            valueGetter: getCesrFrame,
            group: null,
            value: value
        });
        this.start = 0;
    }
    /**
     * @param {number} end
     * @param {object} value 
     */
    pushFrame(end, value) {
        this.currentFrame = new Frame({
            next: this.currentFrame,
            end: end,
            valueGetter: getCesrValue,
            group: null,
            value: value
        });
    }
    popFrame() {
        if (this.isEmpty) throw Error("DecoderState.popFrame");
        this.currentFrame = this.currentFrame.next;
    }
    /**
     * @param {number} count 
     * @param {CesrProtocol} protocol 
     * @param {object} value 
     */
    pushGroup(count, protocol, value) {
        for (let i = 0; i < count; i++) {
            this.currentFrame.group = new Group({
                next: this.currentFrame.group,
                protocol: protocol,
                value: value,
            });
        }
    }
    /**
     * @returns {Group}
     */
    popGroup() {
        const group = this.currentFrame.group;
        this.currentFrame.group = this.currentFrame.group?.next;
        return group;
    }
}

export class CesrDecoder {
    /** @type {CesrProtocol} */
    #protocol;
    /**
     * @param {CesrProtocol} protocol 
     */
    constructor(protocol) {
        if (protocol === null || protocol === undefined) throw new TypeError(`CesrDecoder(protocol): invalid argument`);
        this.#protocol = protocol;
    }
    /**
     * @param {Frame} frame 
     * @param {Group} group 
     * @param {CesrValue} code 
     * @returns {object}
     */
    mapDefault(frame, group, code, offset) { return code; }
    mapJsonFrame(frame, group, code, offset) { return this.mapDefault(frame, group, code, offset); }
    mapCesrFrame(frame, group, code, offset) { return this.mapDefault(frame, group, code, offset); }
    mapCesrGroup(frame, group, code, offset) { return this.mapDefault(frame, group, code, offset); }
    mapCesrLeaf(frame, group, code, offset) { return this.mapDefault(frame, group, code, offset); }
    /**
     * @param {DecoderState} state
     * @param {Uint8Array} input
     */
    nextSlice(state, input) {
        while (true) {
            const slice = input.slice(state.start, state.end);
            if (slice.length > 0) return slice;
            if (state.isEmpty) return slice;
            state.popFrame();
        }
    }
    /**
     * @param {DecoderState} state
     * @param {Uint8Array} input
     */
    *values(state, input) {
        while (true) {
            const slice = this.nextSlice(state, input);
            if (slice.length == 0) break;
            const frame = state.currentFrame;
            const group = state.popGroup();
            const protocol = group?.protocol ?? this.#protocol;
            const getValue = frame.valueGetter;
            const code = getValue(protocol, slice);
            let length = code.length;
            let result = undefined;
            switch (code.header.selector) {
                case "JSON":
                    result = this.mapJsonFrame(frame, group, code, { start: state.start, length: length });
                    break;
                default:
                    if (protocol.isFrame(code.header)) {
                        length = code.header.length;
                        result = this.mapCesrFrame(frame, group, code, { start: state.start, length: length });
                        state.pushFrame(state.start + code.length, result);
                    } else if (protocol.isGroup(code.header)) {
                        result = this.mapCesrGroup(frame, group, code, { start: state.start, length: length });
                        const p = protocol.hasContext(code.header) ? protocol.getContext(code.header) : null;
                        state.pushGroup(code.header.count, p, result);
                    } else {
                        result = this.mapCesrLeaf(frame, group, code, { start: state.start, length: length });
                    }
                    break;
            }
            yield result;
            state.start += length;
        }
    }
}
