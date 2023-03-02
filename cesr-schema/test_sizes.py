import json
import re

with open("codex.json", "r") as fp:
    codex = json.load(fp)

with open("sizes.json", "r") as fp:
    sizes = json.load(fp)

with open("default_sizes.json", "r") as fp:
    default_sizes = json.load(fp)

for i in default_sizes.values():
    for value in i.values():
        # transform regex to python regex
        pattern = value["pattern"]
        pattern = pattern.replace("[:alpha:]", "[A-Za-z]")
        pattern = pattern.replace("[:base64:]", "[A-Za-z0-9_-]")
        value["pattern"] = re.compile(f"^{pattern}")

# buggy selector definitions
special = {"0z","1z","4z"}

# make sure sizes.json and default_sizes.json match
def test_default_sizes():
    codes = set()
    for i in ("Matter","Counter","Indexer"):
        for key in codex[i].keys():
            s = sizes[i][key]
            match = False
            for j in default_sizes[i].values():
                pattern = j["pattern"]
                code = f"{key}AAAAAAAA"[:8]
                if pattern.match(code):
                    assert match == False, f"key = {i}.{key}"
                    match = True
                    codes.add(key)
                    assert s["hs"] == j["hs"], f"key = {i}.{key}"
                    assert s["ss"] == j["ss"], f"key = {i}.{key}"
                    if "os" in j:
                        assert s["os"] == j["os"] or key in special, f"key = {i}.{key}"
                    if "ls" in j:
                        assert s["ls"] == j["ls"], f"key = {i}.{key}"
                    if "fs" in j:
                        assert s["fs"] == j["fs"], f"key = {i}.{key}"
            assert match == True or key in special, f"key = {i}.{key}"

    for i in ("Matter","Counter","Indexer"):
        for key, value in codex[i].items():
            if not key in codes:
                assert key in special, f"key = {i}.{key}"
