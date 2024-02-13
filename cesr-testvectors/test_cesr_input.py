import json
from keri.core.coring import Matter
from keri.core.coring import Counter
from keri.core.coring import Indexer
from base64 import urlsafe_b64decode as decodeB64


def test_cesr_input():
    with open("testvectors.json", "r") as fp:
        dict = json.load(fp)

    for t in dict['Matter']:
        m = Matter(qb64=t['qb64'])
        assert m.code == t['code']
        assert m.raw == decodeB64(t['raw'])

    for t in dict['Counter']:
        m = Counter(qb64=t['qb64'])
        assert m.code == t['code']
        assert m.count == t['digits']

    for t in dict['Indexer']:
        m = Indexer(qb64=t['qb64'])
        assert m.code == t['code']
        assert m.raw == decodeB64(t['raw'])
        assert m.index == t['index']
        if t['ondex'] is None:
            assert m.ondex == m.index
        else:
            assert m.ondex == t['ondex']
