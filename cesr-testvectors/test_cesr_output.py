import json
from keri.core.coring import Matter
from keri.core.coring import Counter
from keri.core.coring import Indexer
from base64 import urlsafe_b64encode as encodeB64


def matter(code, raw):
    m = Matter(raw=raw, code=code)
    t = Matter(qb64=m.qb64)
    assert m.code == t.code
    assert m.raw == t.raw
    return {
        "code": m.code,
        "raw": encodeB64(m.raw).decode("utf-8"),
        "qb64": m.qb64
    }


def counter(code, count):
    m = Counter(count=count, code=code)
    t = Counter(qb64=m.qb64)
    assert m.code == t.code
    assert m.count == t.count
    assert count == t.count
    return {
        "code": m.code,
        "digits": m.count,
        "qb64": m.qb64
    }


def indexer(code, raw, index, ondex=None):
    m = Indexer(raw=raw, code=code, index=index, ondex=ondex)
    t = Indexer(qb64=m.qb64)
    assert m.code == t.code
    assert m.raw == t.raw
    assert m.index == t.index
    assert index == t.index
    assert m.ondex == t.ondex
    if ondex is None:
        assert index == t.ondex
    else:
        assert ondex == t.ondex
    return {
        "code": m.code,
        "raw": encodeB64(m.raw).decode("utf-8"),
        "index": index,
        "ondex": ondex,
        "qb64": m.qb64
    }


def test_cesr_output():
    zero = bytearray(128)
    magic = bytearray(128)
    for i in range(0, 128):
        magic[i] = i
    ff = bytearray([0b11111111]*128)

    dict = {
        "Matter": [],
        "Counter": [],
        "Indexer": [],
    }

    for code in ("A", "0A", "1AAA", "2AAA", "3AAA"):
        m = matter(code, zero)
        dict["Matter"].append(m)
        m = matter(code, magic)
        dict["Matter"].append(m)
        m = matter(code, ff)
        dict["Matter"].append(m)

    for code in ("4A", "7AAA"):
        m = matter(code, zero)
        dict["Matter"].append(m)
        m = matter(code, zero[:-1])
        dict["Matter"].append(m)
        m = matter(code, zero[:-2])
        dict["Matter"].append(m)
        m = matter(code, magic)
        dict["Matter"].append(m)
        m = matter(code, magic[:-1])
        dict["Matter"].append(m)
        m = matter(code, magic[:-2])
        dict["Matter"].append(m)
        m = matter(code, ff)
        dict["Matter"].append(m)
        m = matter(code, ff[:-1])
        dict["Matter"].append(m)
        m = matter(code, ff[:-2])
        dict["Matter"].append(m)

    for code in ("-A", "-0V", "--AAA"):
        m = counter(code, 0)
        dict["Counter"].append(m)
        m = counter(code, 0b10000001)
        dict["Counter"].append(m)
        m = counter(code, 0b11111111)
        dict["Counter"].append(m)

    for code in ("A", "0A", "2A", "3A"):
        if code == "A":
            m = indexer(code, zero, index=0)
            dict["Indexer"].append(m)
            m = indexer(code, magic, index=0x12)
            dict["Indexer"].append(m)
            m = indexer(code, ff, index=0b111111)
            dict["Indexer"].append(m)
        else:
            m = indexer(code, zero, index=0, ondex=0)
            dict["Indexer"].append(m)
            m = indexer(code, magic, index=0x12, ondex=0x34)
            dict["Indexer"].append(m)
            m = indexer(code, ff, index=0b111111, ondex=0b111111)
            dict["Indexer"].append(m)

    with open("testvectors.json", "w") as fp:
        json.dump(dict, fp, indent=2)
