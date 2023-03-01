import json
import re
from os import (path)

from keri.core.coring import (MatterCodex, SmallVarRawSizeCodex, LargeVarRawSizeCodex, NonTransCodex, DigCodex, NumCodex, BextCodex,
                              IndexerCodex, IndexedSigCodex, IndexedCurrentSigCodex, IndexedBothSigCodex, CounterCodex, ProtocolGenusCodex, AltCounterCodex)
from keri.core.parsing import (ColdCodex)
from keri.core.coring import (Matter, Indexer, Counter)

# names.json

names = set()
for i in (MatterCodex, SmallVarRawSizeCodex, LargeVarRawSizeCodex, NumCodex, IndexerCodex, CounterCodex, AltCounterCodex, ProtocolGenusCodex, ColdCodex):
    for key, value in i().__dict__.items():
        names.add(key)

with open("names.json", "w") as fp:
    json.dump(sorted(names), fp, indent=2)

# codex.json

special = {}
codes = set()
codex = {}
for i in (MatterCodex, SmallVarRawSizeCodex, LargeVarRawSizeCodex, NonTransCodex, DigCodex, NumCodex, BextCodex, IndexerCodex, IndexedSigCodex, IndexedCurrentSigCodex, IndexedBothSigCodex, CounterCodex, ProtocolGenusCodex, AltCounterCodex, ColdCodex):
    o = {}
    for key, value in i().__dict__.items():
        o[value] = key
        codes.add(value)
        assert key in names, f"key = {i.__name__}.{key}"
    name = i.__name__.replace("Codex", "")
    codex[name] = o

with open("codex.json", "w") as fp:
    json.dump(codex, fp, indent=2)

# sizes.json

sizes = {}
for i in (Matter, Indexer, Counter):
    o = {}
    for key, value in i.Sizes.items():
        assert key in codes, f"key = {i.__name__}.{key}"
        o[key] = value._asdict()
    sizes[i.__name__] = o

with open("sizes.json", "w") as fp:
    json.dump(sizes, fp, indent=2)

# counter.json

if path.isfile("counter.json"):
    with open("counter.json", "r") as fp:
        counter = json.load(fp)
else:
    counter = {}

for i in ("Counter","AltCounter"):
    if not i in counter:
        counter[i] = {}
    for key, value in codex[i].items():
        if not key in counter[i]:
            counter[i][key] = {}
        counter[i][key]["name"] = value    

with open("counter.json", "w") as fp:
    json.dump(counter, fp, indent=2)

