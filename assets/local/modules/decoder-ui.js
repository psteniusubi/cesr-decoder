import { CesrDecoder } from "./cesr-decoder.js";
import { Utf8 } from "./utf8.js";
export { DecoderState } from "./cesr-decoder.js";

function replacer(k, v) {
    if (v instanceof Uint8Array) {
        return Utf8.decode(v);
    }
    return v;
}
function toJson(obj) {
    return JSON.stringify(obj, replacer, 2);
}
function fromJson(json) {
    return JSON.parse(json);
}

function formatHeader(code) {
    const parts = [];
    parts.push(code.header.value);
    parts.push(code.header.typeName ?? code.header.selector);
    for (const i of ["leadBytes", "size", "count", "version", "index", "ondex"]) {
        if (Object.hasOwn(code.header, i)) {
            parts.push(`${i}=${code.header[i]}`);
        }
    }
    return parts.join(" ");
}

export class DecoderUi extends CesrDecoder {
    mapDefault(frame, group, code, offset) {
        const parent = (group?.value ?? frame.value);
        const details = document.createElement("details");
        details.setAttribute("data-start", offset.start);
        details.setAttribute("data-end", offset.start + offset.length);
        const summary = document.createElement("summary");
        summary.innerText = formatHeader(code);
        details.appendChild(summary);
        parent.appendChild(details);
        return details;
    }
    mapJsonFrame(frame, group, code, offset) {
        const details = this.mapDefault(frame, group, code, offset);
        details.classList.add("frame", "json");
        const section = document.createElement("section");
        section.classList.add("value");
        const value = document.createElement("code");
        value.innerText = toJson(fromJson(Utf8.decode(code.value)));
        section.appendChild(value);
        details.appendChild(section);
        return details;
    }
    mapCesrFrame(frame, group, code, offset) {
        const details = this.mapDefault(frame, group, code, offset);
        details.classList.add("frame", "cesr");
        const section = document.createElement("section");
        section.classList.add("value");
        details.appendChild(section);
        return section;
    }
    mapCesrGroup(frame, group, code, offset) {
        const details = this.mapDefault(frame, group, code, offset);
        details.classList.add("group");
        const section = document.createElement("section");
        section.classList.add("value");
        details.appendChild(section);
        return section;
    }
    mapCesrLeaf(frame, group, code, offset) {
        const details = this.mapDefault(frame, group, code, offset);
        details.classList.add("leaf");
        const section = document.createElement("section");
        section.classList.add("value");
        const value = document.createElement("code");
        value.innerText = Utf8.decode(code.value);
        section.appendChild(value);
        details.appendChild(section);
        return section;
    }
}
